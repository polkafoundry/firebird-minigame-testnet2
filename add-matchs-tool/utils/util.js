const { INC_GAS_PRICE, PKF_FAUCET_TOKEN, PKF_FAUCET_SYMBOL, FAUCET_END_POINT } = require("../config");
const Transaction = require("ethereumjs-tx");
const axios = require("axios");

const randomBet = () => {
  let bets = [
    { ou_ht: "over", odds_ht: "home", ou_ft: "over", odds_ft: "home" },
    { ou_ht: "over", odds_ht: "home", ou_ft: "over", odds_ft: "draw" },
    { ou_ht: "over", odds_ht: "home", ou_ft: "over", odds_ft: "away" },
    { ou_ht: "over", odds_ht: "home", ou_ft: "under", odds_ft: "home" },
    { ou_ht: "over", odds_ht: "home", ou_ft: "under", odds_ft: "draw" },
    { ou_ht: "over", odds_ht: "home", ou_ft: "under", odds_ft: "away" },
    { ou_ht: "over", odds_ht: "draw", ou_ft: "over", odds_ft: "home" },
    { ou_ht: "over", odds_ht: "draw", ou_ft: "over", odds_ft: "draw" },
    { ou_ht: "over", odds_ht: "draw", ou_ft: "over", odds_ft: "away" },
    { ou_ht: "over", odds_ht: "draw", ou_ft: "under", odds_ft: "home" },
    { ou_ht: "over", odds_ht: "draw", ou_ft: "under", odds_ft: "draw" },
    { ou_ht: "over", odds_ht: "draw", ou_ft: "under", odds_ft: "away" },
    { ou_ht: "over", odds_ht: "away", ou_ft: "over", odds_ft: "home" },
    { ou_ht: "over", odds_ht: "away", ou_ft: "over", odds_ft: "draw" },
    { ou_ht: "over", odds_ht: "away", ou_ft: "over", odds_ft: "away" },
    { ou_ht: "over", odds_ht: "away", ou_ft: "under", odds_ft: "home" },
    { ou_ht: "over", odds_ht: "away", ou_ft: "under", odds_ft: "draw" },
    { ou_ht: "over", odds_ht: "away", ou_ft: "under", odds_ft: "away" },
    { ou_ht: "under", odds_ht: "home", ou_ft: "over", odds_ft: "home" },
    { ou_ht: "under", odds_ht: "home", ou_ft: "over", odds_ft: "draw" },
    { ou_ht: "under", odds_ht: "home", ou_ft: "over", odds_ft: "away" },
    { ou_ht: "under", odds_ht: "home", ou_ft: "under", odds_ft: "home" },
    { ou_ht: "under", odds_ht: "home", ou_ft: "under", odds_ft: "draw" },
    { ou_ht: "under", odds_ht: "home", ou_ft: "under", odds_ft: "away" },
    { ou_ht: "under", odds_ht: "draw", ou_ft: "over", odds_ft: "home" },
    { ou_ht: "under", odds_ht: "draw", ou_ft: "over", odds_ft: "draw" },
    { ou_ht: "under", odds_ht: "draw", ou_ft: "over", odds_ft: "away" },
    { ou_ht: "under", odds_ht: "draw", ou_ft: "under", odds_ft: "home" },
    { ou_ht: "under", odds_ht: "draw", ou_ft: "under", odds_ft: "draw" },
    { ou_ht: "under", odds_ht: "draw", ou_ft: "under", odds_ft: "away" },
    { ou_ht: "under", odds_ht: "away", ou_ft: "over", odds_ft: "home" },
    { ou_ht: "under", odds_ht: "away", ou_ft: "over", odds_ft: "draw" },
    { ou_ht: "under", odds_ht: "away", ou_ft: "over", odds_ft: "away" },
    { ou_ht: "under", odds_ht: "away", ou_ft: "under", odds_ft: "home" },
    { ou_ht: "under", odds_ht: "away", ou_ft: "under", odds_ft: "draw" },
    { ou_ht: "under", odds_ht: "away", ou_ft: "under", odds_ft: "away" },
  ];
  return bets[Math.floor(Math.random() * bets.length)];
};

const randomScore = (num) => {
  return {
    home_score: [0, 1, 2, 3, 4][Math.floor(Math.random() * 5)],
    away_score: [0, 1, 2, 3, 4][Math.floor(Math.random() * 5)],
  };
};

const callTransaction = async (web3, callData, private_key, from, to, nonce, value) => {
  try {
    const privateKey = Buffer.from(private_key, "hex");
    const obj = {
      from: from,
      to: to,
      value: value,
      data: callData,
    };

    const [gasPrice, estimateGas] = await Promise.all([web3.eth.getGasPrice(), web3.eth.estimateGas(obj)]);
    const txObject = {
      ...obj,
      nonce: nonce,
      gas: "0x" + Number(estimateGas).toString("16"),
      gasPrice: "0x" + (Number(gasPrice) + INC_GAS_PRICE * Math.pow(10, 9)).toString("16"),
      chainId: 9000,
    };

    const tx = new Transaction(txObject);

    tx.sign(privateKey);
    const raw_tx = "0x" + tx.serialize().toString("hex");
    // console.log({ raw_tx })
    // web3.eth.sendSignedTransaction(raw_tx).on("receipt", console.log);
    await web3.eth.sendSignedTransaction(raw_tx, (err, txHash) => {
      // console.log("txHash:", txHash);
      return;
    });
  } catch (error) {
    console.log("errorr: ", error.message);
  }
};
const faucetBird = async (address) => {
  let body = {
    address: address,
    token: BIRD_FAUCET_TOKEN,
    symbol: BIRD_FAUCET_SYMBOL,
  };
  let res = await axios({
    method: "POST",
    data: body,
    url: FAUCET_END_POINT,
  });
  return res;
}

const faucetPkf = async (address) => {
  let body = {
    address: address,
    token: PKF_FAUCET_TOKEN,
    symbol: PKF_FAUCET_SYMBOL,
  };
  let res = await axios({
    method: "POST",
    data: body,
    url: FAUCET_END_POINT,
  });
  return res;

}

module.exports = {
  randomBet,
  randomScore,
  callTransaction,
  faucetBird,
  faucetPkf
};
