const {upgrades, ethers, waffle} = require("hardhat");
const {utils, BigNumber, BigNumberish} = ethers;

const {fromRpcSig} = require("ethereumjs-util");


const signNftWithdrawalBackend = async function (gameContract, owner, deployer, tokenIds, backend){
    let nonce;
    try {
        nonce = (
            await gameContract.connect(deployer).NFTWithDrawalNonces(owner)
        ).toNumber();
        
    } catch (e) {
        console.error('NONCE', e);
        reject(e);
        return;
    }
    const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24; // 24 hours
    try {
        const types = {
            NftWithdrawal: [
                { name: 'tokenIds', type: 'uint256[]' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint256' },
            ],
        };

        const message = {
            tokenIds,
            nonce,
            deadline,
        };


        const domain = {
            name: 'EpicGame',
            version: '1',
            verifyingContract: gameContract.address
        };
        const sig = await backend._signTypedData(domain, types, message);
        const response = fromRpcSig(sig);
        return ({
            r: response.r,
            s: response.s,
            v: response.v,
            deadline: deadline.toString(),
        }); 
    } catch (e) {
        console.error(e);
    }
}
exports.signNftWithdrawalBackend = signNftWithdrawalBackend; 

const signTokenWithdrawalBackend = async function (gameContract, owner, deployer, amount, backend){
    let nonce;
    try {
        nonce = (
            await gameContract.connect(deployer).TokenWithDrawalNonces(owner)
        ).toNumber();
        
    } catch (e) {
        console.error('NONCE', e);
        reject(e);
        return;
    }
    const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24; // 24 hours
    try {
        const types = {
            TokenWithdrawal: [
                { name: 'amount', type: 'uint256' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint256' },
            ],
        };

        

        const message = {
            amount,
            nonce,
            deadline,
        };
        console.log("message : " + JSON.stringify(message));

        const domain = {
            name: 'EpicGame',
            version: '1',
            verifyingContract: gameContract.address
        };
        const sig = await backend._signTypedData(domain, types, message);
        const response = fromRpcSig(sig);
        return ({
            r: response.r,
            s: response.s,
            v: response.v,
            deadline: deadline.toString(),
        }); 
    } catch (e) {
        console.error(e);
    }
} 

exports.signTokenWithdrawalBackend = signTokenWithdrawalBackend; 

const signTokenClaimBackend = async function (gameContract, owner, deployer, amount, backend){
    let nonce;
    try {
        nonce = (
            await gameContract.connect(deployer).TokenClaimNonces(owner)
        ).toNumber();
        
    } catch (e) {
        console.error('NONCE', e);
        reject(e);
        return;
    }
    const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24; // 24 hours
    try {
        const types = {
            TokenClaim: [
                { name: 'amount', type: 'uint256' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint256' },
            ],
        };

        

        const message = {
            amount,
            nonce,
            deadline,
        };
        console.log("message : " + JSON.stringify(message));

        const domain = {
            name: 'EpicGame',
            version: '1',
            verifyingContract: gameContract.address
        };
        const sig = await backend._signTypedData(domain, types, message);
        const response = fromRpcSig(sig);
        return ({
            r: response.r,
            s: response.s,
            v: response.v,
            deadline: deadline.toString(),
        }); 
    } catch (e) {
        console.error(e);
    }
}

exports.signTokenClaimBackend = signTokenClaimBackend;

// ----- FOR CLAIM KEP TESTNET 3 ---
const signKepClaimBackend = async function (withdrawContract, owner, deployer, amount, backend, transactionId){
    let nonce;
    try {
        nonce = (
            await withdrawContract.connect(deployer).TokenClaimNonces(owner)
        ).toNumber();

    } catch (e) {
        console.error('NONCE', e);
        reject(e);
        return;
    }
    transactionId = transactionId.toString();
    const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24; // 24 hours
    try {
        const types = {
            TokenClaim: [
                { name: 'amount', type: 'uint256' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint256' },
                { name: 'transactionId', type: 'string' },
            ],
        };

        const message = {
            amount,
            nonce,
            deadline,
            transactionId,
        };
        const domain = {
            name: 'EpicGame',
            version: '1',
            verifyingContract: withdrawContract.address
        };
        const sig = await backend._signTypedData(domain, types, message);
        const response = fromRpcSig(sig);
        return ({
            r: response.r,
            s: response.s,
            v: response.v,
            deadline: deadline.toString(),
            transactionId: transactionId.toString(),
        });
    } catch (e) {
        console.error(e);
    }
}

exports.signKepClaimBackend = signKepClaimBackend;