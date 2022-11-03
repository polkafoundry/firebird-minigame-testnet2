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
  const maxAmount = "1000000000000000000000";

  const ContractFactory = await hre.ethers.getContractFactory("SBirdBetting");
  const Contract = await upgrades.deployProxy(ContractFactory, [tokenAddress, fundAddress], {
    initializer: "__SBirdBetting_init",
  });

  const bettingContract = await Contract.deployed();
  console.log("Betting contract deployed to:", bettingContract.address);

  // set max bet amount
  const setBetAmount = await bettingContract.setMaxBetAmount(maxAmount);
  console.log("set max bet amount", setBetAmount.hash);

  // set max bet amount
  // const setMatchInfo = await bettingContract.setMatchInfo(
  //   1,
  //   [1740, 500, 2190, 1980, 2250, 1940, 4470, 2110, 2940, 3860, 3500, 2250],
  //   [0, 0, 0, 0, 1669219200, "QATAR", "ECUADOR", "Al Bayt Stadium", "WORLD CUP - ROUND 1", false, false],
  //   1234
  // );
  // console.log("setMatchInfo", setMatchInfo.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
