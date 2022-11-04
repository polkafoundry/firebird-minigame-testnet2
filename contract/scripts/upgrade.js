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
  const sBirdContract = await ethers.getContractFactory("SBirdBetting");
  const upgradeContract = await upgrades.upgradeProxy("0xF74E67CE9936a6ABb06C0770C1b3b1644e5aA101", sBirdContract);
  console.log("sbird contract upgraded:", upgradeContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
