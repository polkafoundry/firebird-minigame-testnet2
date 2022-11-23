import { JobContract } from '@ioc:Rocketseat/Bull'
import Logger from '@ioc:Adonis/Core/Logger'
const RedisPickWinnerUtils = require('@ioc:App/Common/RedisPickWinner')
const HelperUtils = require('@ioc:App/Common/HelperUtils')
const PredictWinner = require('@ioc:App/Models/PredictWinner')

const REQUEST_RANDOM_NUMBER = 'RequestRandomNumber'
const RECEIVE_RANDOM_NUMBER = 'ReceiveRandomNumber'

const STEP = parseInt(process.env.CRAWL_STEP || '5000', 10)
const Const = require('@ioc:App/Common/Const')
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

export default class FetchPickWinner implements JobContract {
  public key = 'FetchPickWinner'

  public async handle(job) {
    const { data } = job
    const eventType = data.event_type
    let from = data.from
    let to = data.to

    if (await RedisPickWinnerUtils.existRedisPickWinnerBlockNumber(eventType)) {
      let redisData = await RedisPickWinnerUtils.getRedisPickWinnerBlockNumber(eventType)
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

      await RedisPickWinnerUtils.setRedisPickWinnerBlockNumber({
        current: to,
        event_type: eventType,
      })
    } catch (e) {
      Logger.error(e)
    }
  }

  private async fetchEvents(provider, event_type, from, to) {
    const MatchModel = require('@ioc:App/Models/Match')
    const instance = await HelperUtils.getPredictWinnerContractInstance()
    const events = await instance.getPastEvents(event_type, {
      fromBlock: from,
      toBlock: to,
    })
    for (const event of events) {
      const blockData = await provider.eth.getBlock(event.blockNumber)
      switch (event_type) {
        case REQUEST_RANDOM_NUMBER:
          const predictWinner = await PredictWinner.query()
            .where('match_id', event.returnValues.matchID)
            .first()
          if (!predictWinner) {
            let data = new PredictWinner()
            data.transaction_hash = event.transactionHash
            data.transaction_index = event.transactionIndex
            data.block_number = event.blockNumber
            data.dispatch_at = blockData.timestamp
            data.event_type = event_type
            data.match_id = event.returnValues.matchID
            data.req_id = event.returnValues.requestId

            await data.save()
          }

          break
        case RECEIVE_RANDOM_NUMBER:
          const match = await MatchModel.query()
            .where('match_id', event.returnValues.matchID)
            .first()
          if (match) {
            await PredictWinner.query()
              .where('match_id', event.returnValues.matchID)
              .andWhere('req_id', event.returnValues.requestId)
              .update({
                predict_winner: event.returnValues.matchID,
                final_winner: event.returnValues.winner,
                randomness: event.returnValues.result,
                rewards: Const.PREDICT_REWARD_BY_ROUND[match.round_name],
              })
            await MatchModel.query().where('match_id', event.returnValues.matchID).update({
              is_pick_predict_final_winners: true,
            })
          }

          break
        default:
          console.log('FetchPredictWinner: event not supported', event_type)
          return
      }
    }
  }
  public onCompleted(job) {
    job.remove()
  }
}
