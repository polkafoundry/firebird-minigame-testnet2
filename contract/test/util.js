const { upgrades, ethers, waffle } = require("hardhat");
const { utils, BigNumber, BigNumberish } = ethers;

const { fromRpcSig } = require("ethereumjs-util");

// const signTokenClaimBackend = async function (betContract, owner, deployer, matchID, betType, amount, backend) {
//   let nonce;
//   try {
//     nonce = (await betContract.connect(deployer).TokenClaimNonces(owner)).toNumber();
//   } catch (e) {
//     console.error("NONCE", e);
//     reject(e);
//     return;
//   }
//   let deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24; // 24 hours

//   try {
//     const types = {
//       TokenClaim: [
//         { name: "caller", type: "string" },
//         { name: "matchID", type: "uint16" },
//         { name: "betType", type: "string" },
//         { name: "amount", type: "uint256" },
//         { name: "nonce", type: "uint256" },
//         { name: "deadline", type: "uint256" },
//       ],
//     };
//     let caller = owner.toString().toLowerCase();
//     const message = {
//       caller,
//       matchID,
//       betType,
//       amount,
//       nonce,
//       deadline,
//     };

//     const domain = {
//       name: "FirebirdGame",
//       version: "1",
//       verifyingContract: betContract.address,
//     };

//     const sig = await backend._signTypedData(domain, types, message);
//     const response = fromRpcSig(sig);

//     return {
//       r: response.r,
//       s: response.s,
//       v: response.v,
//       deadline: deadline.toString(),
//     };
//   } catch (e) {
//     console.error(e);
//   }
// };

const signGiftCodeBackend = async function (giftCodeContract, owner, deployer, code, amount, backend) {
  let nonce;
  try {
    nonce = (await giftCodeContract.connect(deployer).TokenClaimNonces(owner)).toNumber();
  } catch (e) {
    console.error("NONCE", e);
    reject(e);
    return;
  }
  let deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24; // 24 hours

  try {
    const types = {
      TokenClaim: [
        { name: "caller", type: "string" },
        { name: "code", type: "string" },
        { name: "amount", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };
    let caller = owner.toString().toLowerCase();
    console.log("caller", caller);
    const message = {
      caller,
      code,
      amount,
      nonce,
      deadline,
    };

    const domain = {
      name: "FirebirdGame",
      version: "1",
      verifyingContract: giftCodeContract.address,
    };

    const sig = await backend._signTypedData(domain, types, message);
    const response = fromRpcSig(sig);

    return {
      r: response.r,
      s: response.s,
      v: response.v,
      deadline: deadline.toString(),
    };
  } catch (e) {
    console.error(e);
  }
};

exports.signGiftCodeBackend = signGiftCodeBackend;
