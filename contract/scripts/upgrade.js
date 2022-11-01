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
  const GameContractFactory = await ethers.getContractFactory("NFTWEscrow");
  const gamecontract = await upgrades.upgradeProxy("0x27E0bEfF6F7BBe26EB84ba48dAB2870ef3a25332", GameContractFactory);
  console.log("game contract upgraded:", gamecontract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
