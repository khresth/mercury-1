const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with", deployer.address);

  // 1. Deploy Mock USDC
  const Token = await ethers.getContractFactory("MockUSDC");
  const usd = await Token.deploy();
  await usd.waitForDeployment();          // <- v6 waits for mining
  const usdAddress = await usd.getAddress();
  console.log("USD at", usdAddress);

  // 2. Deploy Mercury
  const Mercury = await ethers.getContractFactory("Mercury");
  const mercury = await Mercury.deploy(usdAddress);
  await mercury.waitForDeployment();
  const mercuryAddress = await mercury.getAddress();
  console.log("Mercury at", mercuryAddress);

  // 3. Mint play money
  const mint = ethers.parseUnits("10000", 6);   // v6 helper
  await usd.mint(await deployer.getAddress(), mint);
  console.log("Minted 10 000 fake USD to", await deployer.getAddress());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});