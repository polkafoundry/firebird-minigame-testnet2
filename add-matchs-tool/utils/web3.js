const Web3 = require("web3");

const { PRIVATE_KEY } = require("../config.js");

const netWorkToProvider = {
  eth: "https://mainnet.infura.io/v3/{infurakey}",
  bsc: "https://bsc-dataseed1.binance.org:443",
  polygon: "https://rpc-mainnet.maticvigil.com/",
  bsc_testnet: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  polygon_testnet: "https://matic-mumbai.chainstacklabs.com/",
  fire_bird_testnet: "https://rpc.testnet-firebird.polkafoundry.com/",
};

module.exports = () => {
  const web3 = new Web3(netWorkToProvider.fire_bird_testnet);
  web3.eth.accounts.wallet.add(PRIVATE_KEY);
  return web3;
};
