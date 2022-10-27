/* eslint-disable no-undef */
/* eslint-disable no-process-exit */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const tokenAddress = "0x2FBE4c9399c279002c0a2e37593d99B555F25824";
  const fundAddress = "0x58562da9cAD0BC44DC6D19E209da93Be834c28B8";
  const maxAmount = 1000000000000000000000;

  const ContractFactory = await hre.ethers.getContractFactory("SBirdBetting");
  const Contract = await upgrades.deployProxy(ContractFactory, ["SBirdBetting", "EWBOX", tokenAddress, fundAddress], {
    initializer: "__SBirdBetting_init",
  });

  const bettingContract = await Contract.deployed();
  console.log("Betting contract deployed to:", bettingContract.address);

  // set max bet amount
  const setBetAmount = await bettingContract.setMaxBetAmount(maxAmount);
  console.log("set max bet amount", setBetAmount.hash);

  // set box contract from random contract
  // const setBoxContract = await randomNumberContract.setBoxContract(
  //   boxContract.address
  // );
  // console.log("set box contract", setBoxContract.hash);
  // 1. Send LINK to randomNumberContract

  // 2 Call requestRandomNumber from box contract
  // const grantNFTMinterRole = await nftContract.grantMinterRole(boxContract.address);
  // console.log("grantNFTMinterRole", grantNFTMinterRole.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
