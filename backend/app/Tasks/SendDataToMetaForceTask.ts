const { CronJob } = require('cron');
import BettingModel from 'App/Models/Betting'
// import Logger from '@ioc:Adonis/Core/Logger'
const Const = require('@ioc:App/Common/Const')
const HelperUtils = require('@ioc:App/Common/HelperUtils')
import axios from 'axios'
import BigNumber from 'bignumber.js'
import Logger from 'App/Common/Logger'

class SendDataToMetaForce {
    async sendData() {
        try {
            const MAX_REQ_SEND_TO_MF = 1000
            let bettings = await BettingModel.query().where('is_calculated', true).where('is_sent_to_mf', false).limit(MAX_REQ_SEND_TO_MF);
            bettings = JSON.parse(JSON.stringify(bettings))
            if (!bettings.length) return
            const currentTime = Date.now()

            const timestamps = Array.from({ length: bettings.length }, (v, i) => {
                return currentTime + i
            })
            const startSend = Date.now()
            const res = await Promise.all(
                bettings.map((betting, index) => this._sendToMetaForce({ betting, timestamp: timestamps[index] }))
            )
            const data: any = {
                success: res.filter(data => data.success).length,
                error: res.filter(data => !data.success).length,
                error_mess: res.filter(data => !data.success).map(err => err.message)
            }

            Logger.info(
                `[${Date.now() - startSend} ms] Send ${bettings.length} req to MF and return ${data.success} success, ${data.error} error, error message: ${JSON.stringify(data.error_mess)}`
            )
        } catch (error) {
            console.log('error SendDataToMetaForceTask: ', error.message)
        }
    }
    private async _sendToMetaForce({ betting, timestamp }) {
        try {
            const time = new Date(timestamp).toISOString()
            const token = HelperUtils.getMFToken(`${time}${Const.MF_KEY.EVENT_NAME}${Const.MF_KEY.TENANT_ID}${Const.MF_KEY.SECRET_KEY}`)

            const resultNum = new BigNumber(betting.result_num).div(10 ** 18);

            const res = await axios.post(`${Const.MF_ENDPOINT}/v1/send/event`, {
                userId: betting.user_address,
                event: Const.MF_KEY.EVENT_NAME,
                properties: {
                    earned: resultNum.gt(0) ? resultNum.toNumber() : 0
                },
                tenantId: Const.MF_KEY.TENANT_ID,
                ts: time
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            if (res.data !== 'OK') throw new Error(res.data)
            await BettingModel.query().where('id', betting.id).update({ is_sent_to_mf: true, updated_at: new Date(), sent_to_mf_at: timestamp })

            return {
                success: true,
                data: res.data
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

const sendDataToMetaForceSchedule = () => {
    const job = new CronJob(
        '*/5 * * * * *',
        function () {
            console.log('Send data to MetaForce schedule');
            new SendDataToMetaForce().sendData()
        }
    );
    job.start()
}

export default sendDataToMetaForceSchedule

module.exports = sendDataToMetaForceSchedule