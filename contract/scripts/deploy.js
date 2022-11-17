/* eslint-disable no-undef */
/* eslint-disable no-process-exit */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const maxAmount = "1000000000000000000000";

  const BirdTokenFactory = await ethers.getContractFactory("BirdToken");
  const bird = await BirdTokenFactory.deploy();

  let birdTokenContract = await bird.deployed();
  console.log("BirdTokenContract contract deployed to: ", birdTokenContract.address);

  // white list deployer
  const whiteListDeployAddress = await birdTokenContract.setWhitelistAddress(process.env.DEPLOYER_ADDRESS);
  console.log("White list deploy address: ", whiteListDeployAddress.hash);

  // white list fund wallet
  const whiteListFundAddress = await birdTokenContract.setWhitelistAddress(process.env.FUND_ADDRESS);
  console.log("White list fund address: ", whiteListFundAddress.hash);

  //send token to fund wallet
  const transferToken = await birdTokenContract.transfer(process.env.FUND_ADDRESS, "100000000000000000000000000");
  console.log("Transfer token to fund wallet: ", transferToken.hash);

  const ContractFactory = await hre.ethers.getContractFactory("SBirdBetting");
  const Contract = await upgrades.deployProxy(ContractFactory, [birdTokenContract.address, process.env.FUND_ADDRESS], {
    initializer: "__SBirdBetting_init",
  });

  const bettingContract = await Contract.deployed();
  console.log("Betting contract deployed to:", bettingContract.address);

  // set max bet amount
  const setBetAmount = await bettingContract.setMaxBetAmount(maxAmount);
  console.log("set max bet amount", setBetAmount.hash);

  //set signer
  const setSigner = await bettingContract.setSigner(process.env.SIGNER_ADDRESS);
  console.log("set signer", setSigner.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
