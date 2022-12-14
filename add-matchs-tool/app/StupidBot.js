"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var MAX_RANGE_SCORE = 4;
var MATCH_ID = 69;
var StupidBot = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // await faucet();
            // await balance();
            // await approve();
            return [4 /*yield*/, predict(MATCH_ID)];
            case 1:
                // await faucet();
                // await balance();
                // await approve();
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var balance = function () { return __awaiter(void 0, void 0, void 0, function () {
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
}); };
var faucet = function () { return __awaiter(void 0, void 0, void 0, function () {
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
}); };
var approve = function () { return __awaiter(void 0, void 0, void 0, function () {
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
}); };
var predict = function (matchID, startIndex, endIndex) {
    if (startIndex === void 0) { startIndex = 0; }
    return __awaiter(void 0, void 0, void 0, function () {
        var wlData, walletIndex, lastIndex, homeScore, awayScore, nonce, predictData, dataLogging, body, res, e_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!matchID)
                        return [2 /*return*/];
                    return [4 /*yield*/, walletData()];
                case 1:
                    wlData = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 12, , 13]);
                    walletIndex = startIndex;
                    lastIndex = endIndex !== null && endIndex !== void 0 ? endIndex : wlData.adds.length;
                    _b.label = 3;
                case 3:
                    if (!(walletIndex < lastIndex)) return [3 /*break*/, 11];
                    homeScore = 0;
                    _b.label = 4;
                case 4:
                    if (!(homeScore <= MAX_RANGE_SCORE)) return [3 /*break*/, 10];
                    awayScore = 0;
                    _b.label = 5;
                case 5:
                    if (!(awayScore <= MAX_RANGE_SCORE)) return [3 /*break*/, 9];
                    return [4 /*yield*/, web3.eth.getTransactionCount(wlData.adds[walletIndex], "pending")];
                case 6:
                    nonce = _b.sent();
                    predictData = betContract.methods.predict(matchID, homeScore, awayScore).encodeABI();
                    callTransaction(web3, predictData, wlData.prik[walletIndex].slice(2), wlData.adds[walletIndex], BETTING_CONTRACT_ADDRESS, nonce, 0);
                    dataLogging = (0, util_1.encryptData)({
                        status: "success",
                        type: "predict",
                        user_address: wlData.adds[walletIndex] || "",
                        match_id: matchID,
                        home_score: +(homeScore || ""),
                        away_score: +(awayScore || "")
                    });
                    body = {
                        log_hash: dataLogging
                    };
                    return [4 /*yield*/, axios({
                            method: "POST",
                            data: body,
                            url: "https://phoenixcup-api.firebirdchain.com/api/v1/user/log-error"
                        })];
                case 7:
                    res = _b.sent();
                    console.log("walletIndex=", walletIndex, "\t_homeScore=", homeScore, "\t_awayscore=", awayScore, "\t====> ", (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.message);
                    if (walletIndex >= wlData.adds.length)
                        return [2 /*return*/];
                    walletIndex++;
                    _b.label = 8;
                case 8:
                    awayScore++;
                    return [3 /*break*/, 5];
                case 9:
                    homeScore++;
                    return [3 /*break*/, 4];
                case 10: return [3 /*break*/, 3];
                case 11: return [3 /*break*/, 13];
                case 12:
                    e_4 = _b.sent();
                    console.log("error: ", e_4.message);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
};
var betting = function (matchID, betType) { return __awaiter(void 0, void 0, void 0, function () {
    var wlData, betAmount, i, betPlace, betAddress, signatureRes, signature, rawSignature, nonce, ouHTData, e_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, walletData()];
            case 1:
                wlData = _c.sent();
                betAmount = "26000000000000000000";
                _c.label = 2;
            case 2:
                _c.trys.push([2, 8, , 9]);
                i = 0;
                _c.label = 3;
            case 3:
                if (!(i < wlData.adds.length)) return [3 /*break*/, 7];
                betPlace = randomBet()[betType];
                betAddress = wlData.adds[i];
                console.log("betting:", i, betType, betPlace);
                return [4 /*yield*/, axios({
                        method: "POST",
                        data: {
                            amount: betAmount,
                            bet_place: betPlace,
                            bet_type: betType,
                            match_id: matchID,
                            wallet: betAddress
                        },
                        url: "https://phoenixcup-api.firebirdchain.com/api/v1/user-betting"
                    })];
            case 4:
                signatureRes = _c.sent();
                signature = null;
                rawSignature = signatureRes === null || signatureRes === void 0 ? void 0 : signatureRes.data;
                if ((signatureRes === null || signatureRes === void 0 ? void 0 : signatureRes.status) === 200 && !!rawSignature) {
                    signature = {
                        deadline: rawSignature === null || rawSignature === void 0 ? void 0 : rawSignature.deadline,
                        v: rawSignature === null || rawSignature === void 0 ? void 0 : rawSignature.v,
                        r: (_a = rawSignature === null || rawSignature === void 0 ? void 0 : rawSignature.r) === null || _a === void 0 ? void 0 : _a.data,
                        s: (_b = rawSignature === null || rawSignature === void 0 ? void 0 : rawSignature.s) === null || _b === void 0 ? void 0 : _b.data
                    };
                }
                return [4 /*yield*/, web3.eth.getTransactionCount(betAddress, "pending")];
            case 5:
                nonce = _c.sent();
                ouHTData = betContract.methods.betting(matchID, betAmount, betType, betPlace, signature).encodeABI();
                callTransaction(web3, ouHTData, wlData.prik[i].slice(2), betAddress, BETTING_CONTRACT_ADDRESS, nonce, 0);
                _c.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 3];
            case 7: return [3 /*break*/, 9];
            case 8:
                e_5 = _c.sent();
                console.log("error: ", e_5.message);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
StupidBot();
