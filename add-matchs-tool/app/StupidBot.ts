const { INC_GAS_PRICE, BIRD_FAUCET_TOKEN, BIRD_FAUCET_SYMBOL } = require("../config");
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

let web3 = getWeb3();
let walletAddress;
let betContract = new web3.eth.Contract(sBirdAbi, BETTING_CONTRACT_ADDRESS);
let birdContract = new web3.eth.Contract(birdTokenAbi, BIRD_CONTRACT_ADDRESS);
let pkfContract = new web3.eth.Contract(erc20ABI, ZERO_ADDRESS);

const MAX_RANGE_SCORE = 5;
const MATCH_ID = 7;

const StupidBot = async () => {
  // await faucet();
  // await balance();
  // await transferTokenIfNeeded();
  // await approve();
  // await predict(MATCH_ID);
  // await betting(MATCH_ID, "ou_ht");
  // await betting(MATCH_ID, "ou_ft");
  // await betting(MATCH_ID, "odds_ht");
  // await betting(MATCH_ID, "odds_ft");
  // await claim(11);
  // await sendPKF();
};

const balance = async () => {
  let wlData = await walletData();
  try {
    const totalWallets = wlData.adds.length;
    const adds = wlData.adds;

    for (let i = 0; i < totalWallets; i++) {
      let res = await birdContract.methods.balanceOf(adds[i]).call();
      if (!res) {
        console.log("index", i);
      } else {
      }
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const faucet = async () => {
  let wlData = await walletData();
  try {
    const totalWallets = wlData.adds.length;

    for (let i = 0; i < totalWallets; i++) {
      if (totalWallets === wlData.prik.length) {
        let body = {
          address: wlData.adds[i],
          token: BIRD_FAUCET_TOKEN,
          symbol: BIRD_FAUCET_SYMBOL,
          // token: PKF_FAUCET_TOKEN,
          // symbol: PKF_FAUCET_SYMBOL,
        };
        let res = await axios({
          method: "POST",
          data: body,
          url: FAUCET_END_POINT,
        });
        if (res.status == 200) {
          console.log(res?.data);
        } else {
          console.log("false index", i);
        }
      }
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const approve = async () => {
  let wlData = await walletData();
  try {
    let birdTokenContract = new web3.eth.Contract(birdTokenAbi, BIRD_CONTRACT_ADDRESS);

    for (let i = 0; i < wlData.adds.length; i++) {
      // let balance = await web3.eth.getBalance(wlData.adds[i]);
      console.log(i);
      let nonce = await web3.eth.getTransactionCount(wlData.adds[i], "pending");

      if (wlData.adds.length === wlData.prik.length) {
        let callData = birdTokenContract.methods
          .approve(
            BETTING_CONTRACT_ADDRESS,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
          )
          .encodeABI();
        callTransaction(
          web3,
          callData,
          wlData.prik[i].slice(2),
          wlData.adds[i],
          BIRD_CONTRACT_ADDRESS,
          nonce,
          0
        );
      }
    }
  } catch (e) {
    console.log("erroxr: ", e.message);
  }
};

const predict = async (matchID, startIndex: number = 0, endIndex?: number) => {
  if (!matchID) return;
  let wlData = await walletData();
  try {
    let walletIndex = startIndex;
    const lastIndex = endIndex ?? wlData.adds.length;

    while (walletIndex < lastIndex) {
      for (let i = 0; i <= MAX_RANGE_SCORE; i++) {
        for (let j = 0; j <= MAX_RANGE_SCORE; j++) {
          let nonce = await web3.eth.getTransactionCount(wlData.adds[walletIndex], "pending");

          let predictData = betContract.methods.predict(matchID, i, j).encodeABI();
          console.log("walletIndex=", walletIndex, "\t_homeScore=", i, "\t_awayscore=", j);
          callTransaction(
            web3,
            predictData,
            wlData.prik[walletIndex].slice(2),
            wlData.adds[walletIndex],
            BETTING_CONTRACT_ADDRESS,
            nonce,
            0
          );
          if (walletIndex >= wlData.adds.length) return;
          walletIndex++;
        }
      }
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const betting = async (matchID, type) => {
  let wlData = await walletData();
  try {
    for (let i = 0; i < wlData.adds.length; i++) {
      if (wlData.adds.length === wlData.prik.length) {
        console.log("betting:", i, type, randomBet()[type]);
        let nonce = await web3.eth.getTransactionCount(wlData.adds[i], "pending");
        //bet
        let ouHTData = betContract.methods
          .betting(matchID, "100000000000000000", type, randomBet()[type])
          .encodeABI();
        callTransaction(
          web3,
          ouHTData,
          wlData.prik[i].slice(2),
          wlData.adds[i],
          BETTING_CONTRACT_ADDRESS,
          nonce,
          0
        );
      }
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const claim = async (matchID) => {
  let wlData = await walletData();

  try {
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

const transferTokenIfNeeded = async () => {
  let wlData = await walletData();
  try {
    let from = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY).address;
    const amount = new BigNumber(1000).times(Math.pow(10, 18)).toFixed();
    for (let i = 0; i < wlData.adds.length; i++) {
      if (i > 310) {
        let nonce = await web3.eth.getTransactionCount(from, "pending");
        let transferData = birdContract.methods.transfer(wlData.adds[i], amount).encodeABI();
        console.log(i);
        //send BIRD
        await callTransaction(
          web3,
          transferData,
          PRIVATE_KEY,
          from,
          BIRD_CONTRACT_ADDRESS,
          nonce,
          0
        );

        //send PKF
        await callTransaction(
          web3,
          null,
          PRIVATE_KEY,
          from,
          wlData.adds[i],
          nonce + 1,
          100000000000000000
        );
      }
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

StupidBot();
