require("dotenv").config();

module.exports = {
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  WALLET_ADDRESS: process.env.WALLET_ADDRESS,
  BETTING_CONTRACT_ADDRESS: process.env.BETTING_CONTRACT_ADDRESS,
  INC_GAS_PRICE: 5,
  CHAIN_ID: process.env.CHAIN_ID,
};
