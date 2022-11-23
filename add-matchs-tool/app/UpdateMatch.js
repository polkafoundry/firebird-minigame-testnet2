const getWeb3 = require("../utils/web3");
const {
  BOX_CONTRACT_ADDRESS,
  PRIVATE_KEY,
  NFT_CONTRACT_ADDRESS,
  INC_GAS_PRICE,
  WALLET_ADDRESS,
  BETTING_CONTRACT_ADDRESS,
} = require("../config.js");
const { sBirdAbi } = require("../abi/index");
const BigNumber = require("bignumber.js");
const Transaction = require("ethereumjs-tx");
const { matchData } = require("./ReadXLSX");
const { getRandomArr } = require("../utils/util");

let web3;
let boxContract;
let walletAddress;

const boxMintInBatch = 140;

const updateMatch = async (matchID) => {
  try {
    const mData = await matchData();
    // console.log("xxx", mData[1]);

    // for (let i = 0; i < mData.length; i++) {
    //   if (mData[i].mID === matchID) {
    //     console.log(mData[i].mInf);
    //   }
    // }
    // return;
    let newInfo = [0, 0, 0, 0, 1668578400, "SHIJA KUNGFU", "5448", "MEIZHOU", "20772", "Al-Thumama Stadium", "3", 0, 0];

    web3 = getWeb3();
    // Get wallet address
    walletAddress = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY).address;

    console.log(`Sign with wallet address ${walletAddress}`);

    betContract = new web3.eth.Contract(sBirdAbi, BETTING_CONTRACT_ADDRESS);
    let createMatchCallData = betContract.methods.updateMatchInfo(matchID, newInfo).encodeABI();
    await callTransaction(createMatchCallData);
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const callTransaction = async (callData) => {
  try {
    const privateKey = Buffer.from(PRIVATE_KEY, "hex");
    const obj = {
      from: WALLET_ADDRESS,
      to: BETTING_CONTRACT_ADDRESS,
      value: 0,
      data: callData,
    };

    const [gasPrice, estimateGas, nonce] = await Promise.all([
      web3.eth.getGasPrice(),
      web3.eth.estimateGas(obj),
      web3.eth.getTransactionCount(WALLET_ADDRESS, "pending"),
    ]);
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

    await web3.eth.sendSignedTransaction(raw_tx, (err, txHash) => {
      console.log("txHash:", txHash);
    });
  } catch (error) {
    console.log("error: ", error.message);
  }
};

updateMatch(42);
