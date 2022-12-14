import { encryptData, faucetBird, faucetPkf } from "../utils/util";

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
  WALLET_ADDRESS,
  ZERO_ADDRESS,
} = require("../config.js");
const { sBirdAbi, birdTokenAbi, erc20ABI } = require("../abi/index");
const { walletData } = require("./ReadXLSX");
const { callTransaction, randomBet, randomScore } = require("../utils/util");
const BigNumber = require("bignumber.js");

const axios = require("axios");
const fs = require("fs");
let web3 = getWeb3();
let walletAddress;
let betContract = new web3.eth.Contract(sBirdAbi, BETTING_CONTRACT_ADDRESS);
let birdContract = new web3.eth.Contract(birdTokenAbi, BIRD_CONTRACT_ADDRESS);
let pkfContract = new web3.eth.Contract(erc20ABI, ZERO_ADDRESS);

const MAX_RANGE_SCORE = 4;
const MATCH_ID = 69;

const StupidBot = async () => {
  // await faucet();
  // await balance();
  // await approve();
  await predict(MATCH_ID);
  // await betting(MATCH_ID, "ou_ht");
  // await betting(MATCH_ID, "ou_ft");
  // await betting(MATCH_ID, "odds_ht");
  // await betting(MATCH_ID, "odds_ft");
  // await claim(11);
};

const balance = async () => {
  let wlData = await walletData();
  try {
    const totalWallets = wlData.adds.length;
    const adds = wlData.adds;
    let birdTokenContract = new web3.eth.Contract(birdTokenAbi, BIRD_CONTRACT_ADDRESS);
    let textLog = "";

    // check PKF
    for (let i = 0; i < totalWallets; i++) {
      let bal = await web3.eth.getBalance(adds[i]);
      // let bal = await birdContract.methods.balanceOf(adds[i]).call();
      if (new BigNumber(bal).lte("100000000000000000")) {
        // < 0.1
        console.log("walletIndex: ", i, "bird: ", bal);
        textLog += `${adds[i]}\n`;
        // await faucetPkf(adds[i]);

        let nonce = await web3.eth.getTransactionCount(WALLET_ADDRESS, "pending");

        //send PKF
        await callTransaction(
          web3,
          null,
          PRIVATE_KEY,
          WALLET_ADDRESS,
          adds[i],
          nonce,
          "100000000000000000" //send 0.1 pkf
        );

        //approve
        let nonce2 = await web3.eth.getTransactionCount(adds[i], "pending");

        let callData = await birdTokenContract.methods
          .approve(
            BETTING_CONTRACT_ADDRESS,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
          )
          .encodeABI();
        await callTransaction(web3, callData, wlData.prik[i].slice(2), adds[i], BIRD_CONTRACT_ADDRESS, nonce2, 0);
      }
    }

    //check wallet faucet failure
    fs.writeFile("../add-matchs-tool/data/wallet0.txt", textLog, (err) => {
      if (err) {
        console.log("error write file", err);
      }
      // file written successfully
    });
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const faucet = async () => {
  let wlData = await walletData();
  try {
    const totalWallets = wlData.adds.length;

    for (let i = 0; i < totalWallets; i++) {
      const res = await faucetBird(wlData.adds[i]);

      if (res.status == 200) {
        console.log(res?.data);
      } else {
        console.log("false index", i);
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
      console.log("approving: ", i);
      let nonce = await web3.eth.getTransactionCount(wlData.adds[i], "pending");

      let callData = birdTokenContract.methods
        .approve(
          BETTING_CONTRACT_ADDRESS,
          "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        )
        .encodeABI();
      callTransaction(web3, callData, wlData.prik[i].slice(2), wlData.adds[i], BIRD_CONTRACT_ADDRESS, nonce, 0);
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
      for (let homeScore = 0; homeScore <= MAX_RANGE_SCORE; homeScore++) {
        for (let awayScore = 0; awayScore <= MAX_RANGE_SCORE; awayScore++) {
          let nonce = await web3.eth.getTransactionCount(wlData.adds[walletIndex], "pending");

          let predictData = betContract.methods.predict(matchID, homeScore, awayScore).encodeABI();
          callTransaction(
            web3,
            predictData,
            wlData.prik[walletIndex].slice(2),
            wlData.adds[walletIndex],
            BETTING_CONTRACT_ADDRESS,
            nonce,
            0
          );

          // send log error
          const dataLogging = encryptData({
            status: "success",
            type: "predict",
            user_address: wlData.adds[walletIndex] || "",
            match_id: matchID,
            home_score: +(homeScore || ""),
            away_score: +(awayScore || ""),
          });

          let body = {
            log_hash: dataLogging,
          };
          let res = await axios({
            method: "POST",
            data: body,
            url: "https://phoenixcup-api.firebirdchain.com/api/v1/user/log-error",
          });
          console.log(
            "walletIndex=",
            walletIndex,
            "\t_homeScore=",
            homeScore,
            "\t_awayscore=",
            awayScore,
            "\t====> ",
            res?.data?.message
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

const betting = async (matchID, betType) => {
  let wlData = await walletData();
  const betAmount = "26000000000000000000"; // 26 bird
  try {
    for (let i = 0; i < wlData.adds.length; i++) {
      const betPlace = randomBet()[betType];
      const betAddress = wlData.adds[i];
      console.log("betting:", i, betType, betPlace);

      //get signature
      let signatureRes = await axios({
        method: "POST",
        data: {
          amount: betAmount,
          bet_place: betPlace,
          bet_type: betType,
          match_id: matchID,
          wallet: betAddress,
        },
        url: "https://phoenixcup-api.firebirdchain.com/api/v1/user-betting",
      });
      let signature: any = null;

      const rawSignature = signatureRes?.data;
      if (signatureRes?.status === 200 && !!rawSignature) {
        signature = {
          deadline: rawSignature?.deadline,
          v: rawSignature?.v,
          r: rawSignature?.r?.data,
          s: rawSignature?.s?.data,
        };
      }

      //bet
      let nonce = await web3.eth.getTransactionCount(betAddress, "pending");
      let ouHTData = betContract.methods.betting(matchID, betAmount, betType, betPlace, signature).encodeABI();
      callTransaction(web3, ouHTData, wlData.prik[i].slice(2), betAddress, BETTING_CONTRACT_ADDRESS, nonce, 0);
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

StupidBot();
