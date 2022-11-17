"use strict";

import UnauthorizedException from 'App/Exceptions/UnauthorizedException';
const Const = require('@ioc:App/Common/Const')
import Web3 from 'web3'
const web3 = new Web3();

export default class CheckSignature {
    async handle({ request, }, next) {
        try {
            const params = request.all();
            const headers = request.headers();
            const signature = params.signature;
            const message = headers.msgsignature;

            let recover = await web3.eth.accounts.recover(message, signature);
            const recoverConvert = Web3.utils.toChecksumAddress(recover);
            const wallet_address = Web3.utils.toChecksumAddress(params.wallet_address);
            if (recoverConvert && recoverConvert !== wallet_address) {
                throw new UnauthorizedException('Invalid signature!');
            }

            if (!Const.ADMIN_ACCOUNT.includes(wallet_address)) throw new UnauthorizedException('Not Authorized!');
            headers.wallet_address = wallet_address;

            await next();
        } catch (e) {
            throw new UnauthorizedException('Unauthorized!');
        }
    }
}

module.exports = CheckSignature;
