import { JobContract } from '@ioc:Rocketseat/Bull'
import Logger from '@ioc:Adonis/Core/Logger'
const RedisUserPredictUtils = require('@ioc:App/Common/RedisUserPredictUtils')
const HelperUtils = require('@ioc:App/Common/HelperUtils')
const PredictModel = require('@ioc:App/Models/Predict')
const BetCountModel = require('@ioc:App/Models/BetCount')

const USER_PREDICT = 'UserPredicting'

const STEP = parseInt(process.env.CRAWL_STEP || '5000', 10)

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

export default class FetchPredictInfoJob implements JobContract {
  public key = 'FetchPredictInfoJob'

  public async handle(job) {
    const { data } = job

    const eventType = data.event_type
    let from = data.from
    let to = data.to

    if (await RedisUserPredictUtils.existRedisPredictBlockNumber(eventType)) {
      let redisData = await RedisUserPredictUtils.getRedisPredictBlockNumber(eventType)
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
        `fetch ${eventType} from ${from} to ${to} in epic_box: ${endTime[0]}s ${
          endTime[1] / 1000000
        }ms`
      )
      if (notCached) {
        return
      }

      await RedisUserPredictUtils.setRedisPredictBlockNumber({ current: to, event_type: eventType })
    } catch (e) {
      Logger.error(e)
    }
  }

  private async fetchEvents(provider, event_type, from, to) {
    const instance = await HelperUtils.getBettingContractInstance()

    const events = await instance.getPastEvents(event_type, {
      fromBlock: from,
      toBlock: to,
    })
    for (const event of events) {
      const blockData = await provider.eth.getBlock(event.blockNumber)
      switch (event_type) {
        case USER_PREDICT:
          const userPredict = await PredictModel.query()
            .where('match_id', event.returnValues.matchID)
            .andWhere('user_address', event.returnValues.user)
            .first()
          if (userPredict) {
            await PredictModel.query()
              .where('match_id', event.returnValues.matchID)
              .andWhere('user_address', event.returnValues.user)
              .update({
                transaction_hash: event.transactionHash,
                transaction_index: event.transactionIndex,
                block_number: event.blockNumber,
                dispatch_at: blockData.timestamp,
                event_type: event_type,
                user_address: event.returnValues.user,
                match_id: event.returnValues.matchID,
                home_score: event.returnValues.homeScore,
                away_score: event.returnValues.awayScore,
                predict_time: event.returnValues.time,
              })
          } else {
            let predictData = new PredictModel()
            predictData.transaction_hash = event.transactionHash
            predictData.transaction_index = event.transactionIndex
            predictData.block_number = event.blockNumber
            predictData.dispatch_at = blockData.timestamp
            predictData.event_type = event_type
            predictData.user_address = event.returnValues.user
            predictData.match_id = event.returnValues.matchID
            predictData.home_score = event.returnValues.homeScore
            predictData.away_score = event.returnValues.awayScore
            predictData.predict_time = event.returnValues.time
            await predictData.save()

            let betss = await BetCountModel.query()
              .where('match_id', event.returnValues.matchID)
              .andWhere('user_address', event.returnValues.user)
              .first()

            if (betss) {
              await BetCountModel.query()
                .where('match_id', event.returnValues.matchID)
                .andWhere('user_address', event.returnValues.user)
                .update({
                  bet_count: betss.bet_count + 1,
                })
            } else {
              let betCountData = new BetCountModel()
              betCountData.match_id = event.returnValues.matchID
              betCountData.user_address = event.returnValues.user
              betCountData.bet_count = 1
              await betCountData.save()
            }
          }
          break
        default:
          console.log('FetchBoxJob: event not supported', event_type)
          return
      }
    }
  }
  public onCompleted(job) {
    job.remove()
  }
}
