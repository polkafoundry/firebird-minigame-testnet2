// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { generateKey } = require("crypto");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [deployer] = await hre.ethers.getSigners();

  const GameContract = await hre.ethers.getContractFactory("NFTWEscrow");

  gameContract = await (
    await upgrades.deployProxy(
      // @ts-ignore
      GameContract,
      ["0x32A6d358466B7F7ef17A6021F5DcCd0Fd6E73c10", "0x6aeC333716b2618276b5C52e052c0CdD7f5307A4"],
      { initializer: "__NFTWEscrow_init" }
    )
  ).deployed();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("game contract address:", gameContract.address);
  await gameContract.connect(deployer).setSigner("0x49F6e43d1A5eAe3Ed6bCE7B3b0B9b8f03cCf45eC");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
