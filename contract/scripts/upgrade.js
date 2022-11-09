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
  const upgradeContract = await upgrades.upgradeProxy("0x420F54f674E0CB66b3F746aCe15bfE2d2782EA51", sBirdContract);
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
