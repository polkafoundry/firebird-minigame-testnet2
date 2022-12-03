import { JobContract } from '@ioc:Rocketseat/Bull'
import Logger from '@ioc:Adonis/Core/Logger'
const RedisUserBettingUtils = require('@ioc:App/Common/RedisUserBettingUtils')
const HelperUtils = require('@ioc:App/Common/HelperUtils')

const BettingModel = require('@ioc:App/Models/Betting')
const PredictModel = require('@ioc:App/Models/Predict')

const USER_BETTING = 'UserBetting'
const USER_CLAIM = 'UserClaim'
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

export default class FetchUserBettingInfoJob implements JobContract {
  public key = 'FetchUserBettingInfoJob'

  public async handle(job) {
    const { data } = job

    const eventType = data.event_type
    let from = data.from
    let to = data.to

    if (await RedisUserBettingUtils.existRedisBettingBlockNumber(eventType)) {
      let redisData = await RedisUserBettingUtils.getRedisBettingBlockNumber(eventType)
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

      await RedisUserBettingUtils.setRedisBettingBlockNumber({ current: to, event_type: eventType })
    } catch (e) {
      Logger.error(e)
    }
  }

  private async fetchEvents(provider, event_type, from, to) {
    try {
      const instance = await HelperUtils.getBettingContractInstance()

      const events = await instance.getPastEvents(event_type, {
        fromBlock: from,
        toBlock: to,
      })
      let searchPayload =
        event_type === USER_BETTING
          ? ['user_address', 'match_id', 'bet_type']
          : event_type === USER_CLAIM
          ? ['user_address', 'match_id', 'bet_type']
          : ['user_address', 'match_id']

      let payloads: any = []
      for (const event of events) {
        // const blockData = await provider.eth.getBlock(event.blockNumber)
        switch (event_type) {
          case USER_BETTING:
            payloads.push({
              transaction_hash: event.transactionHash,
              transaction_index: event.transactionIndex,
              block_number: event.blockNumber,
              dispatch_at: 1,
              event_type: event_type,
              user_address: event.returnValues.user,
              match_id: event.returnValues.matchID,
              bet_type: event.returnValues.betType,
              bet_place: event.returnValues.betPlace,
              bet_amount: event.returnValues.amount,
            })
            break
          case USER_CLAIM:
            payloads.push({
              user_address: event.returnValues.user,
              match_id: event.returnValues.matchID,
              bet_type: event.returnValues.betType,
              has_claim: true,
            })
            break
          case USER_PREDICT:
            let change = false
            payloads = await payloads.map((p) => {
              if (
                p.user_address === event.returnValues.user &&
                p.match_id === event.returnValues.matchID
              ) {
                change = true
                return {
                  ...p,
                  home_score: event.returnValues.homeScore,
                  away_score: event.returnValues.awayScore,
                }
              }
              return p
            })
            if (!change) {
              payloads.push({
                transaction_hash: event.transactionHash,
                transaction_index: event.transactionIndex,
                block_number: event.blockNumber,
                dispatch_at: 1,
                event_type: event_type,
                user_address: event.returnValues.user,
                match_id: event.returnValues.matchID,
                home_score: event.returnValues.homeScore,
                away_score: event.returnValues.awayScore,
                predict_time: event.returnValues.time,
              })
            }
            break
          default:
            console.log('FetchUserBettingJob: event not supported', event_type)
            return
        }
      }
      if (event_type === USER_BETTING) {
        await BettingModel.updateOrCreateMany(searchPayload, payloads)
      } else if (event_type === USER_PREDICT) {
        await PredictModel.updateOrCreateMany(searchPayload, payloads)
      } else if (event_type === USER_CLAIM) {
        await BettingModel.updateOrCreateMany(searchPayload, payloads)
      }
    } catch (error) {
      Logger.error(error)
    }
  }
  public onCompleted(job) {
    job.remove()
  }
}
