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
const { walletData, matchData } = require("./ReadXLSX");
const { callTransaction, randomBet, randomScore } = require("../utils/util");
const BigNumber = require("bignumber.js");

const axios = require("axios");
// import axios from "axios";

let web3;
let walletAddress;
let wlData;
let betContract;
let birdContract;
let pkfContract;

const StupidBot = async () => {
  wlData = await walletData();
  let matchs = await matchData();
  // console.log(matchs);

  web3 = getWeb3();
  betContract = new web3.eth.Contract(sBirdAbi, BETTING_CONTRACT_ADDRESS);
  birdContract = new web3.eth.Contract(birdTokenAbi, BIRD_CONTRACT_ADDRESS);
  pkfContract = new web3.eth.Contract(erc20ABI, ZERO_ADDRESS);
  // await faucet();
  // await transferTokenIfNeeded();

  for (let i = 0; i < matchs.length; i++) {
    console.log(matchs[i].mID);
    await predict(matchs[i].mID);
    await betting(matchs[i].mID, "ou_ht");
    await betting(matchs[i].mID, "ou_ft");
    await betting(matchs[i].mID, "odds_ht");
    await betting(matchs[i].mID, "odds_ft");
  }

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
      // let balance = await web3.eth.getBalance(wlData.adds[i]);
      console.log(i);
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
    for (let i = 0; i < 20; i++) {
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
    for (let i = 0; i < 20; i++) {
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
  };
  var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0: case 1: t = op; break;
          case 4: _.label++; return { value: op[1], done: false };
          case 5: _.label++; y = op[1]; op = [0]; continue;
          case 7: op = _.ops.pop(); _.trys.pop(); continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
            if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
            if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
            if (t[2]) _.ops.pop();
            _.trys.pop(); continue;
        }
        op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  exports.__esModule = true;
  var util_1 = require("../utils/util");
  var _a = require("../config"), INC_GAS_PRICE = _a.INC_GAS_PRICE, BIRD_FAUCET_TOKEN = _a.BIRD_FAUCET_TOKEN, BIRD_FAUCET_SYMBOL = _a.BIRD_FAUCET_SYMBOL;
  var Transaction = require("ethereumjs-tx");
  var getWeb3 = require("../utils/web3");
  var _b = require("../config.js"), FAUCET_END_POINT = _b.FAUCET_END_POINT, BETTING_CONTRACT_ADDRESS = _b.BETTING_CONTRACT_ADDRESS, BIRD_CONTRACT_ADDRESS = _b.BIRD_CONTRACT_ADDRESS, PKF_FAUCET_TOKEN = _b.PKF_FAUCET_TOKEN, PKF_FAUCET_SYMBOL = _b.PKF_FAUCET_SYMBOL, PRIVATE_KEY = _b.PRIVATE_KEY, WALLET_ADDRESS = _b.WALLET_ADDRESS, ZERO_ADDRESS = _b.ZERO_ADDRESS;
  var _c = require("../abi/index"), sBirdAbi = _c.sBirdAbi, birdTokenAbi = _c.birdTokenAbi, erc20ABI = _c.erc20ABI;
  var walletData = require("./ReadXLSX").walletData;
  var _d = require("../utils/util"), callTransaction = _d.callTransaction, randomBet = _d.randomBet, randomScore = _d.randomScore;
  var BigNumber = require("bignumber.js");
  var axios = require("axios");
  var fs = require("fs");
  var web3 = getWeb3();
  var walletAddress;
  var betContract = new web3.eth.Contract(sBirdAbi, BETTING_CONTRACT_ADDRESS);
  var birdContract = new web3.eth.Contract(birdTokenAbi, BIRD_CONTRACT_ADDRESS);
  var pkfContract = new web3.eth.Contract(erc20ABI, ZERO_ADDRESS);
  var MAX_RANGE_SCORE = 5;
  var MATCH_ID = 53;
  var StupidBot = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            // await faucet();
            // await balance();
            // await transferTokenIfNeeded();
            // await approve();
            return [4 /*yield*/, predict(MATCH_ID)];
          case 1:
            // await faucet();
            // await balance();
            // await transferTokenIfNeeded();
            // await approve();
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  var balance = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var wlData, totalWallets, adds, birdTokenContract, textLog, i, bal, nonce, nonce2, callData, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0: return [4 /*yield*/, walletData()];
          case 1:
            wlData = _a.sent();
            _a.label = 2;
          case 2:
            _a.trys.push([2, 12, , 13]);
            totalWallets = wlData.adds.length;
            adds = wlData.adds;
            birdTokenContract = new web3.eth.Contract(birdTokenAbi, BIRD_CONTRACT_ADDRESS);
            textLog = "";
            i = 0;
            _a.label = 3;
          case 3:
            if (!(i < totalWallets)) return [3 /*break*/, 11];
            return [4 /*yield*/, web3.eth.getBalance(adds[i])];
          case 4:
            bal = _a.sent();
            if (!new BigNumber(bal).lte("100000000000000000")) return [3 /*break*/, 10];
            // < 0.1
            console.log("walletIndex: ", i, "bird: ", bal);
            textLog += "".concat(adds[i], "\n");
            return [4 /*yield*/, web3.eth.getTransactionCount(WALLET_ADDRESS, "pending")];
          case 5:
            nonce = _a.sent();
            //send PKF
            return [4 /*yield*/, callTransaction(web3, null, PRIVATE_KEY, WALLET_ADDRESS, adds[i], nonce, "100000000000000000" //send 0.1 pkf
            )];
          case 6:
            //send PKF
            _a.sent();
            return [4 /*yield*/, web3.eth.getTransactionCount(adds[i], "pending")];
          case 7:
            nonce2 = _a.sent();
            return [4 /*yield*/, birdTokenContract.methods
              .approve(BETTING_CONTRACT_ADDRESS, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
              .encodeABI()];
          case 8:
            callData = _a.sent();
            return [4 /*yield*/, callTransaction(web3, callData, wlData.prik[i].slice(2), adds[i], BIRD_CONTRACT_ADDRESS, nonce2, 0)];
          case 9:
            _a.sent();
            _a.label = 10;
          case 10:
            i++;
            return [3 /*break*/, 3];
          case 11:
            //check wallet faucet failure
            fs.writeFile("../add-matchs-tool/data/wallet0.txt", textLog, function (err) {
              if (err) {
                console.log("error write file", err);
              }
              // file written successfully
            });
            return [3 /*break*/, 13];
          case 12:
            e_1 = _a.sent();
            console.log("error: ", e_1.message);
            return [3 /*break*/, 13];
          case 13: return [2 /*return*/];
        }
      });
    });
  };
  var faucet = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var wlData, totalWallets, i, res, e_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0: return [4 /*yield*/, walletData()];
          case 1:
            wlData = _a.sent();
            _a.label = 2;
          case 2:
            _a.trys.push([2, 7, , 8]);
            totalWallets = wlData.adds.length;
            i = 0;
            _a.label = 3;
          case 3:
            if (!(i < totalWallets)) return [3 /*break*/, 6];
            return [4 /*yield*/, (0, util_1.faucetBird)(wlData.adds[i])];
          case 4:
            res = _a.sent();
            if (res.status == 200) {
              console.log(res === null || res === void 0 ? void 0 : res.data);
            }
            else {
              console.log("false index", i);
            }
            _a.label = 5;
          case 5:
            i++;
            return [3 /*break*/, 3];
          case 6: return [3 /*break*/, 8];
          case 7:
            e_2 = _a.sent();
            console.log("error: ", e_2.message);
            return [3 /*break*/, 8];
          case 8: return [2 /*return*/];
        }
      });
    });
  };
  var approve = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var wlData, birdTokenContract, i, nonce, callData, e_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0: return [4 /*yield*/, walletData()];
          case 1:
            wlData = _a.sent();
            _a.label = 2;
          case 2:
            _a.trys.push([2, 7, , 8]);
            birdTokenContract = new web3.eth.Contract(birdTokenAbi, BIRD_CONTRACT_ADDRESS);
            i = 0;
            _a.label = 3;
          case 3:
            if (!(i < wlData.adds.length)) return [3 /*break*/, 6];
            // let balance = await web3.eth.getBalance(wlData.adds[i]);
            console.log("approving: ", i);
            return [4 /*yield*/, web3.eth.getTransactionCount(wlData.adds[i], "pending")];
          case 4:
            nonce = _a.sent();
            callData = birdTokenContract.methods
              .approve(BETTING_CONTRACT_ADDRESS, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
              .encodeABI();
            callTransaction(web3, callData, wlData.prik[i].slice(2), wlData.adds[i], BIRD_CONTRACT_ADDRESS, nonce, 0);
            _a.label = 5;
          case 5:
            i++;
            return [3 /*break*/, 3];
          case 6: return [3 /*break*/, 8];
          case 7:
            e_3 = _a.sent();
            console.log("erroxr: ", e_3.message);
            return [3 /*break*/, 8];
          case 8: return [2 /*return*/];
        }
      });
    });
  };
  var predict = function (matchID, startIndex, endIndex) {
    if (startIndex === void 0) { startIndex = 0; }
    return __awaiter(void 0, void 0, void 0, function () {
      var wlData, walletIndex, lastIndex, i, j, nonce, predictData, e_4;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!matchID)
              return [2 /*return*/];
            return [4 /*yield*/, walletData()];
          case 1:
            wlData = _a.sent();
            _a.label = 2;
          case 2:
            _a.trys.push([2, 11, , 12]);
            walletIndex = startIndex;
            lastIndex = endIndex !== null && endIndex !== void 0 ? endIndex : wlData.adds.length;
            _a.label = 3;
          case 3:
            if (!(walletIndex < lastIndex)) return [3 /*break*/, 10];
            i = 0;
            _a.label = 4;
          case 4:
            if (!(i <= MAX_RANGE_SCORE)) return [3 /*break*/, 9];
            j = 0;
            _a.label = 5;
          case 5:
            if (!(j <= MAX_RANGE_SCORE)) return [3 /*break*/, 8];
            return [4 /*yield*/, web3.eth.getTransactionCount(wlData.adds[walletIndex], "pending")];
          case 6:
            nonce = _a.sent();
            predictData = betContract.methods.predict(matchID, i, j).encodeABI();
            console.log("walletIndex=", walletIndex, "\t_homeScore=", i, "\t_awayscore=", j);
            callTransaction(web3, predictData, wlData.prik[walletIndex].slice(2), wlData.adds[walletIndex], BETTING_CONTRACT_ADDRESS, nonce, 0);
            if (walletIndex >= wlData.adds.length)
              return [2 /*return*/];
            walletIndex++;
            _a.label = 7;
          case 7:
            j++;
            return [3 /*break*/, 5];
          case 8:
            i++;
            return [3 /*break*/, 4];
          case 9: return [3 /*break*/, 3];
          case 10: return [3 /*break*/, 12];
          case 11:
            e_4 = _a.sent();
            console.log("error: ", e_4.message);
            return [3 /*break*/, 12];
          case 12: return [2 /*return*/];
        }
      });
    });
  };
  var betting = function (matchID, type) {
    return __awaiter(void 0, void 0, void 0, function () {
      var wlData, i, nonce, ouHTData, e_5;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0: return [4 /*yield*/, walletData()];
          case 1:
            wlData = _a.sent();
            _a.label = 2;
          case 2:
            _a.trys.push([2, 7, , 8]);
            i = 0;
            _a.label = 3;
          case 3:
            if (!(i < wlData.adds.length)) return [3 /*break*/, 6];
            console.log("betting:", i, type, randomBet()[type]);
            return [4 /*yield*/, web3.eth.getTransactionCount(wlData.adds[i], "pending")];
          case 4:
            nonce = _a.sent();
            ouHTData = betContract.methods
              .betting(matchID, "3000000000000000000", type, randomBet()[type])
              .encodeABI();
            callTransaction(web3, ouHTData, wlData.prik[i].slice(2), wlData.adds[i], BETTING_CONTRACT_ADDRESS, nonce, 0);
            _a.label = 5;
          case 5:
            i++;
            return [3 /*break*/, 3];
          case 6: return [3 /*break*/, 8];
          case 7:
            e_5 = _a.sent();
            console.log("error: ", e_5.message);
            return [3 /*break*/, 8];
          case 8: return [2 /*return*/];
        }
      });
    });
  };
  var claim = function (matchID) {
    return __awaiter(void 0, void 0, void 0, function () {
      var wlData, body, res, claimToken, i, body_1, res_1, e_6;
      var _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0: return [4 /*yield*/, walletData()];
          case 1:
            wlData = _c.sent();
            _c.label = 2;
          case 2:
            _c.trys.push([2, 11, , 12]);
            web3 = getWeb3();
            betContract = new web3.eth.Contract(sBirdAbi, BETTING_CONTRACT_ADDRESS);
            walletAddress = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY).address;
            body = {
              match_id: matchID,
              wallet: walletAddress,
              bet_type: "ou_ht",
              amount: "37916666666666660000"
            };
            return [4 /*yield*/, axios({
              method: "POST",
              data: body,
              url: "http://127.0.0.1:3333/api/v1/claim/get-sig"
            })];
          case 3:
            res = _c.sent();
            if (!(res.status == 200)) return [3 /*break*/, 5];
            console.log((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.signature);
            claimToken = betContract.methods
              .tokenClaim(matchID, "ou_ht", "37916666666666660000", (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.signature)
              .encodeABI();
            return [4 /*yield*/, callTransaction(claimToken)];
          case 4:
            _c.sent();
            return [3 /*break*/, 6];
          case 5:
            console.log(res);
            _c.label = 6;
          case 6: return [2 /*return*/];
          case 7:
            if (!(i < 10)) return [3 /*break*/, 10];
            if (!(wlData.adds.length === wlData.prik.length)) return [3 /*break*/, 9];
            body_1 = {
              match_id: matchID,
              bet_type: PKF_FAUCET_TOKEN,
              amount: PKF_FAUCET_SYMBOL
            };
            return [4 /*yield*/, axios({
              method: "POST",
              data: body_1,
              url: FAUCET_END_POINT
            })];
          case 8:
            res_1 = _c.sent();
            if (res_1.status == 200) {
              console.log(res_1);
            }
            else {
              console.log(res_1);
            }
            _c.label = 9;
          case 9:
            i++;
            return [3 /*break*/, 7];
          case 10: return [3 /*break*/, 12];
          case 11:
            e_6 = _c.sent();
            console.log("error: ", e_6.message);
            return [3 /*break*/, 12];
          case 12: return [2 /*return*/];
        }
      });
    });
  };
  var transferTokenIfNeeded = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var wlData, from, amount, i, nonce, transferData, e_7;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0: return [4 /*yield*/, walletData()];
          case 1:
            wlData = _a.sent();
            _a.label = 2;
          case 2:
            _a.trys.push([2, 9, , 10]);
            from = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY).address;
            amount = new BigNumber(1000).times(Math.pow(10, 18)).toFixed();
            i = 0;
            _a.label = 3;
          case 3:
            if (!(i < wlData.adds.length)) return [3 /*break*/, 8];
            if (!(i > 310)) return [3 /*break*/, 7];
            return [4 /*yield*/, web3.eth.getTransactionCount(from, "pending")];
          case 4:
            nonce = _a.sent();
            transferData = birdContract.methods.transfer(wlData.adds[i], amount).encodeABI();
            console.log(i);
            //send BIRD
            return [4 /*yield*/, callTransaction(web3, transferData, PRIVATE_KEY, from, BIRD_CONTRACT_ADDRESS, nonce, 0)];
          case 5:
            //send BIRD
            _a.sent();
            //send PKF
            return [4 /*yield*/, callTransaction(web3, null, PRIVATE_KEY, from, wlData.adds[i], nonce + 1, 100000000000000000)];
          case 6:
            //send PKF
            _a.sent();
            _a.label = 7;
          case 7:
            i++;
            return [3 /*break*/, 3];
          case 8: return [3 /*break*/, 10];
          case 9:
            e_7 = _a.sent();
            console.log("error: ", e_7.message);
            return [3 /*break*/, 10];
          case 10: return [2 /*return*/];
        }
      });
    });
  };
  StupidBot();
