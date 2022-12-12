const { CronJob } = require('cron');

import SendTransactionModel from 'App/Models/SendTransaction'

const HelperUtils = require("@ioc:App/Common/HelperUtils")
const Const = require("@ioc:App/Common/Const")
import BigNumber from "bignumber.js";
import TransactionService from 'App/Services/TransactionService'

class SendBirdToMonsEventTask {
    async start() {
        try {
            let trans = await SendTransactionModel.query().where('is_sent', false)

            if (!trans.length) return

            const disperseContract = await HelperUtils.getDisperseContractInstance()

            const tokenContract = trans[0].token_address
            trans = trans.filter(tx => tx.token_address == tokenContract)

            const data = disperseContract.methods.disperseToken(
                tokenContract,
                trans.map(tran => tran.address),
                trans.map(tran => new BigNumber(tran.value).times(new BigNumber(10).pow(Const.TOKEN_DECIMALS)).toFixed(0))
            ).encodeABI()

            const hash = await new TransactionService().sendTransaction({
                to: Const.DISPERSE_SMART_CONTRACT,
                value: 0,
                data
            }, Const.BIRD_FUND_PRIVATE_KEY)

            await SendTransactionModel.query().whereIn('id', trans.map(tx => tx.id)).update({ is_sent: true, transaction_hash: hash, created_at: new Date() })
        } catch (error) {
            console.log('error SendBirdToMonsEventTask: ', error.message)
        }
    }
}

const sendBirdToMonsEventTask = () => {
    const job = new CronJob(
        '0 * * * * *',
        function () {
            new SendBirdToMonsEventTask().start()
        }
    );
    job.start()
}

export default sendBirdToMonsEventTask

module.exports = sendBirdToMonsEventTask