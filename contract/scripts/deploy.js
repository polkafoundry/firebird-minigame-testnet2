/* eslint-disable no-undef */
/* eslint-disable no-process-exit */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const tokenAddress = "0x75B609AA12713b2fb7Ac141B2dD06d81cf4115E3";
  const fundAddress = "0x1522E0De73B85D0b8DE2c67b4263F8Fa4A88abBB";
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
