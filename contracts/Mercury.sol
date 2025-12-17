// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Mercury {
    struct Loan {
        address lender;
        address borrower;
        uint256 amount;
        uint256 interest;      // basis points: 1000 = 10 %
        uint256 duration;      // seconds
        uint256 dueDate;
        bool repaid;
    }

    IERC20 public immutable USD;
    uint256 public nextLoanId = 1;
    mapping(uint256 => Loan) public loans;

    event Posted(uint256 indexed id, address indexed lender, uint256 amount, uint256 interest, uint256 duration);
    event Accepted(uint256 indexed id, address indexed borrower);
    event Repaid(uint256 indexed id);

    constructor(address usdAddress) {
        USD = IERC20(usdAddress);
    }

    // 1. Lender posts an offer
    function postLoan(uint256 _amount, uint256 _interest, uint256 _duration) external {
        USD.transferFrom(msg.sender, address(this), _amount);
        loans[nextLoanId] = Loan({
            lender: msg.sender,
            borrower: address(0),
            amount: _amount,
            interest: _interest,
            duration: _duration,
            dueDate: 0,
            repaid: false
        });
        emit Posted(nextLoanId, msg.sender, _amount, _interest, _duration);
        nextLoanId++;
    }

    // 2. Borrower picks it
    function acceptLoan(uint256 _id) external {
        Loan storage l = loans[_id];
        require(l.borrower == address(0), "taken");
        l.borrower = msg.sender;
        l.dueDate = block.timestamp + l.duration;
        USD.transfer(msg.sender, l.amount);
        emit Accepted(_id, msg.sender);
    }

    // 3. Repay
    function repay(uint256 _id) external {
        Loan storage l = loans[_id];
        require(msg.sender == l.borrower, "only borrower");
        require(!l.repaid, "repaid");
        uint256 owed = l.amount + (l.amount * l.interest / 10_000);
        USD.transferFrom(msg.sender, address(this), owed);
        USD.transfer(l.lender, owed);
        l.repaid = true;
        emit Repaid(_id);
    }

    // 4. Auto-liquidation if overdue (lender can call)
    function liquidate(uint256 _id) external {
        Loan storage l = loans[_id];
        require(l.borrower != address(0), "not accepted");
        require(!l.repaid, "repaid");
        require(block.timestamp > l.dueDate, "not overdue");
        l.repaid = true; // mark so no double spend
        USD.transfer(l.lender, l.amount); // lender gets principal back
    }

    // Helper view
    function openLoans() external view returns (uint256[] memory ids) {
        uint256 c = 0;
        for (uint256 i = 1; i < nextLoanId; i++) if (loans[i].borrower == address(0)) c++;
        ids = new uint256[](c);
        uint256 idx = 0;
        for (uint256 i = 1; i < nextLoanId; i++) if (loans[i].borrower == address(0)) ids[idx++] = i;
    }
}