import { JobContract } from '@ioc:Rocketseat/Bull'
import BettingModel from 'App/Models/Betting'
// import Logger from '@ioc:Adonis/Core/Logger'
const Const = require('@ioc:App/Common/Const')
const HelperUtils = require('@ioc:App/Common/HelperUtils')
import axios from 'axios'
import BigNumber from 'bignumber.js'
import Logger from 'App/Common/Logger'

/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/
import Bull from '@ioc:Rocketseat/Bull'

/* Ranges from 1 (highest priority) to MAX_INT (lowest priority). */
const priority = 3
/* Repeat after this amount of milliseconds */
const repeatEvery = 5 * 1000 // 5 second
/* Repeat after this amount of milliseconds */
/* The total number of attempts to try the job until it completes.*/
const attempts = 1

export const sendDataToMetaForceJob = async () => {
  try {
    const jobKey = new SendDataToMetaForceJob().key
    await Bull.getByKey(jobKey).bull.add(jobKey, {}, {
      priority: priority,
      removeOnComplete: true,
      removeOnFail: true,
      repeat: {
        every: repeatEvery, // 1 minutes
        immediately: true,
      },
      attempts: attempts,
    })
  } catch (e) {
    console.log('error sendDataToMetaForceJob: ', e.message)
  } finally {
  }
}

export default class SendDataToMetaForceJob implements JobContract {
  public key = 'SendDataToMetaForceJob'

  public async handle() {
    try {
      const MAX_REQ_SEND_TO_MF = 500
      // Do somethign with you job data
      let bettings = await BettingModel.query().where('is_calculated', true).where('is_sent_to_mf', false).limit(MAX_REQ_SEND_TO_MF);
      bettings = JSON.parse(JSON.stringify(bettings))
      console.log(`${new Date().toISOString()}`, { bettings })
      if (!bettings.length) return
      const currentTime = Date.now()
      const times = Array.from({ length: bettings.length }, (v, i) => {
        return new Date(currentTime + i).toISOString()
      })

      const res = await Promise.all(
        bettings.map((betting, index) => this._sendToMetaForce({ betting, time: times[index] }))
      )
      const data: any = {
        success: res.filter(data => data.success).length,
        error: res.filter(data => !data.success).length,
        error_mess: res.filter(data => !data.success).map(err => err.message)
      }

      Logger.info(
        `Send ${bettings.length} req to MF and return ${data.success} success, ${data.error} error, error message: ${JSON.stringify(data.error_mess)}`
      )
    } catch (error) {
      console.log('error SendDataToMetaForceJob: ', error.message)
      throw new Error(error.message)
    }
  }
  private async _sendToMetaForce({ betting, time }) {
    try {
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
      await BettingModel.query().where('id', betting.id).update({ is_sent_to_mf: true, updated_at: new Date(), sent_to_mf_at: new Date() })

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
