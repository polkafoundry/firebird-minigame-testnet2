const { INC_GAS_PRICE } = require("../config");
const Transaction = require("ethereumjs-tx");
const getWeb3 = require("../utils/web3");
const {
  FAUCET_END_POINT,
  BETTING_CONTRACT_ADDRESS,
  BIRD_CONTRACT_ADDRESS,
  PKF_FAUCET_TOKEN,
  PKF_FAUCET_SYMBOL,
  PRIVATE_KEY,
  ZERO_ADDRESS,
} = require("../config.js");
const { sBirdAbi, birdTokenAbi, erc20ABI } = require("../abi/index");
const { walletData } = require("./ReadXLSX");
const { callTransaction, randomBet, randomScore } = require("../utils/util");
const BigNumber = require("bignumber.js");

const axios = require("axios");
// import axios from "axios";

let web3;
let walletAddress;
let wlData;
const StupidBot = async () => {
  wlData = await walletData();
  // console.log("xxx", wlData);
  web3 = getWeb3();
  betContract = new web3.eth.Contract(sBirdAbi, BETTING_CONTRACT_ADDRESS);
  // await faucet();
  // await approve();
  await predict(21);
  await betting(21, "ou_ht");
  await betting(21, "ou_ft");
  await betting(21, "odds_ht");
  await betting(21, "odds_ft");
  // await claim(11);
  // await sendPKF();
};

const faucet = async () => {
  try {
    const wlData = await walletData();

    web3 = getWeb3();
    betContract = new web3.eth.Contract(sBirdAbi, BETTING_CONTRACT_ADDRESS);

    for (let i = 0; i < 2; i++) {
      if (wlData.adds.length === wlData.prik.length) {
        let body = {
          address: wlData.adds[i],
          token: PKF_FAUCET_TOKEN,
          symbol: PKF_FAUCET_SYMBOL,
        };
        let res = await axios({
          method: "POST",
          data: body,
          url: FAUCET_END_POINT,
        });
        if (res.status == 200) {
          console.log(res);
        } else {
          console.log(res);
        }
        // axios
        //   .post("https://faucet.firefly.firebirdchain.com/api/v1/faucet", body)
        //   .then(function (response) {
        //     if (response?.data?.code === 200) {
        //       console.log("success:", body, response);
        //     } else {
        //       console.log("error:", response?.data?.message, body);
        //     }
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        // let createMatchCallData = betContract.methods
        //   .setMatchInfo(mData[i].mID, mData[i].mSta, mData[i].mInf, mData[i].sofaID)
        //   .encodeABI();
        // await callTransaction(createMatchCallData);
      }
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const approve = async () => {
  try {
    let birdTokenContract = new web3.eth.Contract(birdTokenAbi, BIRD_CONTRACT_ADDRESS);

    for (let i = 0; i < wlData.adds.length; i++) {
      let balance = await web3.eth.getBalance(wlData.adds[i]);
      console.log(balance);
      let nonce = await web3.eth.getTransactionCount(wlData.adds[i], "pending");
      console.log(nonce);

      if (wlData.adds.length === wlData.prik.length) {
        let callData = birdTokenContract.methods
          .approve(
            BETTING_CONTRACT_ADDRESS,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
          )
          .encodeABI();
        callTransaction(web3, callData, wlData.prik[i].slice(2), wlData.adds[i], BIRD_CONTRACT_ADDRESS, nonce, 0);
      }
    }
  } catch (e) {
    console.log("erroxr: ", e.message);
  }
};

const predict = async (matchID) => {
  try {
    for (let i = 0; i < wlData.adds.length; i++) {
      if (wlData.adds.length === wlData.prik.length) {
        // predict
        let nonce = await web3.eth.getTransactionCount(wlData.adds[i], "pending");
        console.log("predict:", i);
        let predictData = betContract.methods
          .predict(matchID, randomScore().home_score, randomScore().away_score)
          .encodeABI();
        callTransaction(web3, predictData, wlData.prik[i].slice(2), wlData.adds[i], BETTING_CONTRACT_ADDRESS, nonce, 0);
      }
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const betting = async (matchID, type) => {
  try {
    for (let i = 0; i < wlData.adds.length; i++) {
      if (wlData.adds.length === wlData.prik.length) {
        console.log("betting:", i, type, randomBet()[type]);
        let nonce = await web3.eth.getTransactionCount(wlData.adds[i], "pending");
        //bet
        let ouHTData = betContract.methods.betting(matchID, "100000000000000000", type, randomBet()[type]).encodeABI();
        callTransaction(web3, ouHTData, wlData.prik[i].slice(2), wlData.adds[i], BETTING_CONTRACT_ADDRESS, nonce, 0);
      }
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const claim = async (matchID) => {
  try {
    const wlData = await walletData();

    web3 = getWeb3();
    betContract = new web3.eth.Contract(sBirdAbi, BETTING_CONTRACT_ADDRESS);
    walletAddress = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY).address;

    let body = {
      match_id: matchID,
      wallet: walletAddress,
      bet_type: "ou_ht",
      amount: "37916666666666660000",
    };
    let res = await axios({
      method: "POST",
      data: body,
      url: "http://127.0.0.1:3333/api/v1/claim/get-sig",
    });
    if (res.status == 200) {
      console.log(res?.data?.signature);
      // console.log(r);
      // let claimToken = betContract.methods
      //   .tokenClaim(matchID, "ou_ht", "910000000000000000000", {
      //     deadline: res?.data?.signature.deadline,
      //     v: res?.data?.signature.v,
      //     r: r,
      //     s: s,
      //   })
      //   .encodeABI();

      let claimToken = betContract.methods
        .tokenClaim(matchID, "ou_ht", "37916666666666660000", res?.data?.signature)
        .encodeABI();
      await callTransaction(claimToken);
    } else {
      console.log(res);
    }

    return;
    for (let i = 0; i < 10; i++) {
      if (wlData.adds.length === wlData.prik.length) {
        let body = {
          match_id: matchID,
          bet_type: PKF_FAUCET_TOKEN,
          amount: PKF_FAUCET_SYMBOL,
        };
        let res = await axios({
          method: "POST",
          data: body,
          url: FAUCET_END_POINT,
        });
        if (res.status == 200) {
          console.log(res);
        } else {
          console.log(res);
        }
        // axios
        //   .post("https://faucet.firefly.firebirdchain.com/api/v1/faucet", body)
        //   .then(function (response) {
        //     if (response?.data?.code === 200) {
        //       console.log("success:", body, response);
        //     } else {
        //       console.log("error:", response?.data?.message, body);
        //     }
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        // let createMatchCallData = betContract.methods
        //   .setMatchInfo(mData[i].mID, mData[i].mSta, mData[i].mInf, mData[i].sofaID)
        //   .encodeABI();
        // await callTransaction(createMatchCallData);
      }
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const sendPKF = async () => {
  try {
    const wlData = await walletData();
    // console.log("xxx", wlData);
    // return;
    web3 = getWeb3();
    pkfContract = new web3.eth.Contract(erc20ABI, ZERO_ADDRESS);

    let from = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY).address;
    // web3.eth.getPendingTransactions((err, pendingTxs) => {
    //   console.log("Pending transactions are: ", pendingTxs);
    //   // In case if you want to return pendingTxs
    //   console.log("xx", pendingTxs);
    //   return pendingTxs;
    // });
    for (let i = 0; i < 5; i++) {
      let nonce = await web3.eth.getTransactionCount(from, "pending");
      console.log(nonce);
      //send PKF
      await callTransaction(web3, null, PRIVATE_KEY, from, wlData.adds[i], nonce, 100000000000000000);
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const sendBird = async () => {
  try {
    const wlData = await walletData();
    // console.log("xxx", wlData);
    // return;
    web3 = getWeb3();
    birdContract = new web3.eth.Contract(birdTokenAbi, BIRD_CONTRACT_ADDRESS);
    pkfContract = new web3.eth.Contract(erc20ABI, ZERO_ADDRESS);

    let from = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY).address;
    const amount = new BigNumber(1000).times(Math.pow(10, 18)).toFixed();
    for (let i = 0; i < 5; i++) {
      let nonce = await web3.eth.getTransactionCount(from, "pending");
      console.log(nonce + i * 2);
      console.log(nonce + i * 2 + 1);
      let transferData = pkfContract.methods.transfer(wlData.adds[i], amount).encodeABI();

      //send BIRD
      await callTransaction(web3, transferData, PRIVATE_KEY, from, BIRD_CONTRACT_ADDRESS, nonce + i * 2, 0);

      //send PKF
      await callTransaction(web3, null, PRIVATE_KEY, from, wlData.adds[i], nonce + i * 2 + 1, 100000000000000000);
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

StupidBot();
