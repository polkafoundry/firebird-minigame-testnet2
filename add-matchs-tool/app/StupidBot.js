const getWeb3 = require("../utils/web3");
const {
  FAUCET_END_POINT,
  BETTING_CONTRACT_ADDRESS,
  BIRD_CONTRACT_ADDRESS,
  PKF_FAUCET_TOKEN,
  PKF_FAUCET_SYMBOL,
} = require("../config.js");
const { sBirdAbi, birdTokenAbi } = require("../abi/index");
const { walletData } = require("./ReadXLSX");
const { callTransaction, randomBet, randomScore } = require("../utils/util");

const axios = require("axios");
// import axios from "axios";

let web3;
let walletAddress;

const StupidBot = async () => {
  await faucet();
  // await approve();
  // await betting(1);
  // await claim(1);
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
    const wlData = await walletData();

    web3 = getWeb3();

    let birdTokenContract = new web3.eth.Contract(birdTokenAbi, BIRD_CONTRACT_ADDRESS);

    for (let i = 0; i < 5; i++) {
      console.log(wlData.prik[i].slice(2));
      console.log(wlData.adds[i]);
      if (wlData.adds.length === wlData.prik.length) {
        let callData = birdTokenContract.methods
          .approve(
            BETTING_CONTRACT_ADDRESS,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
          )
          .encodeABI();
        await callTransaction(web3, callData, wlData.prik[i].slice(2), wlData.adds[i], BIRD_CONTRACT_ADDRESS);
      }
    }
  } catch (e) {
    console.log("erroxr: ", e.message);
  }
};

const betting = async (matchID) => {
  try {
    const wlData = await walletData();
    // console.log("xxx", wlData);
    web3 = getWeb3();
    betContract = new web3.eth.Contract(sBirdAbi, BETTING_CONTRACT_ADDRESS);

    for (let i = 0; i < wlData.adds.length; i++) {
      if (wlData.adds.length === wlData.prik.length) {
        //predict
        let predictData = betContract.methods
          .betting(matchID, randomScore().home_score, randomScore().away_score)
          .encodeABI();
        await callTransaction(web3, predictData, wlData.prik[i], wlData.adds[i], BETTING_CONTRACT_ADDRESS);

        //bet
        let ouHTData = betContract.methods
          .betting(matchID, "1000000000000000000000", "ou_ht", randomBet().ou_ht)
          .encodeABI();
        await callTransaction(web3, ouHTData, wlData.prik[i], wlData.adds[i], BETTING_CONTRACT_ADDRESS);

        let ouFTData = betContract.methods
          .betting(matchID, "1000000000000000000000", "ou_ft", randomBet().ou_ft)
          .encodeABI();
        await callTransaction(web3, ouFTData, wlData.prik[i], wlData.adds[i], BETTING_CONTRACT_ADDRESS);

        let oddsHTData = betContract.methods
          .betting(matchID, "1000000000000000000000", "odds_ht", randomBet().odds_ht)
          .encodeABI();
        await callTransaction(web3, oddsHTData, wlData.prik[i], wlData.adds[i], BETTING_CONTRACT_ADDRESS);

        let oddsFTData = betContract.methods
          .betting(matchID, "1000000000000000000000", "odds_ft", randomBet().odds_ft)
          .encodeABI();
        await callTransaction(web3, oddsFTData, wlData.prik[i], wlData.adds[i], BETTING_CONTRACT_ADDRESS);
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

StupidBot();
