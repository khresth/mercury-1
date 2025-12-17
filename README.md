# Mercury, A Fiat-Based P2P Lending Marketplace on Chain

## What Is Mercury?
Mercury is a simple, secure app where people can lend and borrow money directly from each other, like posting loan offers on a community bulletin board. Imagine X saying, “I’ll lend $100 at 10% interest for 30 days,” and Y picking it from a public list. The app uses blockchain to manage everything automatically, like a robot bank teller, ensuring no one can cheat. It’s built using digital dollars (not risky cryptocurrencies) to comply with laws, with a clear interface, user-set loan terms, and a ratings system to show who’s trustworthy.

<img width="1272" height="928" alt="image" src="https://github.com/user-attachments/assets/224e7340-143d-46c0-a968-cd44dee95689" />


**Why**: Unlike traditional banks, Mercury would let users set their own terms (e.g., high interest like 100% if they want), shows all deals publicly, and cuts out middlemen, saving time and money. It’s like a digital lending club built to be fair and transparent.

**Analogy**: Think of it as a lemonade stand where X offers $100 worth of lemonade, sets his price (interest), and a robot (smart contract) ensures Y pays back $110 later. Everything’s written on a public sign (blockchain) so everyone trusts the process.

## How It Works
Here’s how this would ideally work:
1. **Post a Loan**: X opens the app, connects a digital wallet (like PayPal for blockchain), and offers $100 at 10% interest for 30 days. The app locks his money in a digital vault and lists it publicly: “$100, 10% interest, 30 days, X’s rating: 4.5/5.”
2. **Pick a Loan**: Y browses the list, likes X’s offer, and clicks “Accept.” The vault sends $100 to her wallet and sets a rule: repay $110 in 30 days.
3. **Repay**: On day 30, the vault automatically takes $110 from Y’s wallet and sends it to X. If she doesn’t pay, it might take her deposit (collateral).
4. **Ratings**: Both get a rating boost (e.g., +0.1 points) for completing the loan, like eBay seller ratings, shown in the list to build trust.
5. **Transparency**: All terms (amount, rate, duration, ratings) are public on the blockchain, like a shared notebook anyone can check.
6. **No Crypto Trading**: Uses digital dollars (stablecoins, e.g., USDT = $1) for lending only, not buying or selling.

**Analogy**: It’s like a vending machine for loans. X puts in $100, sets the price, and Y buys it. The machine (smart contract) ensures payment, and a public log (blockchain) tracks everything.

## Features
1. **Create Loan**: Form to enter amount (e.g., “$100”), interest rate (e.g., “10%”), duration (e.g., “30 days”).
2. **Central Listing**: Shows loans (e.g., “$100, 10% interest, 30 days, X’s rating: 4.5/5”) with “Accept” button and high-rate warnings (e.g., “100% interest is risky”).
3. **Accept Loan**: Button to agree to terms, moving funds to borrower.
4. **Repay Loan**: Button to repay (e.g., “$110”), auto-handled by smart contract.
5. **Ratings**: +0.1 points per completed loan, shown in listing.
6. **Transparency**: All details public on TON testnet explorer. (future update, using testnet now)
