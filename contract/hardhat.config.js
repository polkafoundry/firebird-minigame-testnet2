require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    eth_testnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
    bsc_testnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
    bsc: {
      url: `https://bsc-dataseed.binance.org/`,
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      gasPrice: 40000000000,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com/",
      chainId: 137,
      gasPrice: 20000000000,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
    firebird: {
      url: "https://rpc.firefly.firebirdchain.com/",
      chainId: 9000,
      gasPrice: 40000000000,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
