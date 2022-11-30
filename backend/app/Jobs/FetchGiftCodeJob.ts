import { JobContract } from '@ioc:Rocketseat/Bull'
import Logger from '@ioc:Adonis/Core/Logger'
const RedisGiftCodeUtils = require('@ioc:App/Common/RedisGiftCodeUtils')
const HelperUtils = require('@ioc:App/Common/HelperUtils')
const GiftCodeHistoryModel = require('@ioc:App/Models/GiftCodeHistory')
const GiftCodeModel = require('@ioc:App/Models/GiftCode')

const USER_USE_CODE = 'UserUseCode'

const STEP = parseInt(process.env.CRAWL_STEP || '5000', 10)

export default class FetchGiftCodeJob implements JobContract {
  public key = 'FetchGiftCodeJob'

  public async handle(job) {
    const { data } = job
    const eventType = data.event_type
    let from = data.from
    let to = data.to

    if (await RedisGiftCodeUtils.existRedisGiftCodeBlockNumber(eventType)) {
      let redisData = await RedisGiftCodeUtils.getRedisGiftCodeBlockNumber(eventType)
      redisData = JSON.parse(redisData)
      if (redisData && redisData.current) {
        from = redisData.current
      }
    }
    const notCached = data.notCached

    try {
      if (!isNaN(from)) {
        from = parseInt(from)
      }
      if (!isNaN(to)) {
        to = parseInt(to)
      }
      const provider = await HelperUtils.getWeb3Provider()
      const latestBlockNumber = (await provider.eth.getBlockNumber()) - 1
      if (!to || to > latestBlockNumber || to < from) {
        to = latestBlockNumber
      }
      if (from > latestBlockNumber || from >= to) {
        return
      }
      data.to = to
      // fetch
      const startTime = process.hrtime()
      for (let index = from; index < to; index += STEP) {
        let tmp = index + STEP
        if (tmp >= to) {
          tmp = to
        }
        await this.fetchEvents(provider, eventType, index, tmp)
      }
      const endTime = process.hrtime(startTime)
      Logger.info(
        `fetch ${eventType} from ${from} to ${to} in predict winner: ${endTime[0]}s ${
          endTime[1] / 1000000
        }ms`
      )
      if (notCached) {
        return
      }

      await RedisGiftCodeUtils.setRedisGiftCodeBlockNumber({
        current: to,
        event_type: eventType,
      })
    } catch (e) {
      Logger.error(e)
    }
  }

  private async fetchEvents(provider, event_type, from, to) {
    const instance = await HelperUtils.getGiftCodeContractInstance()
    const events = await instance.getPastEvents(event_type, {
      fromBlock: from,
      toBlock: to,
    })
    for (const event of events) {
      switch (event_type) {
        case USER_USE_CODE:
          console.log('11', event_type)

          const gc = await GiftCodeModel.query().where('code', event.returnValues.code).first()
          console.log('2', gc)

          if (gc) {
            await GiftCodeModel.query()
              .where('code', event.returnValues.code)
              .update({
                remaining: gc.remaining - 1,
              })
            let gch = new GiftCodeHistoryModel()
            gch.code = event.returnValues.code
            gch.user_address = event.returnValues.user
            gch.time_use = Date.now() / 1000
            gch.rewards = event.returnValues.amount
            await gch.save()
          }
          break
        default:
          console.log('FetchGiftCodeJob: event not supported', event_type)
          return
      }
    }
  }
  public onCompleted(job) {
    job.remove()
  }
}
