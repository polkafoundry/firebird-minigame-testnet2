import { JobContract } from '@ioc:Rocketseat/Bull'
import Logger from '@ioc:Adonis/Core/Logger'
const RedisUserBettingUtils = require('@ioc:App/Common/RedisUserBettingUtils')
const HelperUtils = require('@ioc:App/Common/HelperUtils')

const BetCountModel = require('@ioc:App/Models/BetCount')
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
    try {
      const { data } = job
      console.log('start 1')

      const eventType = data.event_type
      let from = data.from
      let to = data.to

      if (await RedisUserBettingUtils.existRedisBettingBlockNumber(eventType)) {
        console.log('2', from)
        let redisData = await RedisUserBettingUtils.getRedisBettingBlockNumber(eventType)
        redisData = JSON.parse(redisData)
        if (redisData && redisData.current) {
          from = redisData.current
          console.log('doneeeeee', from)
        }
      }
      console.log('3', from)
      const notCached = data.notCached
      if (!isNaN(from)) {
        from = parseInt(from)
      }
      if (!isNaN(to)) {
        to = parseInt(to)
      }
      console.log('4', from)
      const provider = await HelperUtils.getWeb3Provider()
      const latestBlockNumber = (await provider.eth.getBlockNumber()) - 1
      console.log('5', from)
      if (!to || to > latestBlockNumber || to < from) {
        to = latestBlockNumber
      }
      console.log('6', from)
      if (from > latestBlockNumber || from >= to) {
        return
      }
      console.log('7', from)
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
      console.log('8', from)
      const endTime = process.hrtime(startTime)
      Logger.info(
        `fetch ${eventType} from ${from} to ${to}: ${endTime[0]}s ${endTime[1] / 1000000}ms`
      )
      if (notCached) {
        return
      }

      await RedisUserBettingUtils.setRedisBettingBlockNumber({ current: to, event_type: eventType })
      console.log('done', to)
    } catch (e) {
      Logger.error(e)
    }
  }

  private async fetchEvents(provider, event_type, from, to) {
    try {
      const instance = await HelperUtils.getBettingContractInstance()
      console.log(event_type, from, to)

      const events = await instance.getPastEvents(event_type, {
        fromBlock: from,
        toBlock: to,
      })
      let searchPayload =
        event_type === USER_BETTING
          ? ['user_address', 'match_id', 'bet_type']
          : ['user_address', 'match_id']
      let payloads: any = []
      for (const event of events) {
        const blockData = await provider.eth.getBlock(event.blockNumber)
        switch (event_type) {
          case USER_BETTING:
            payloads.push({
              transaction_hash: event.transactionHash,
              transaction_index: event.transactionIndex,
              block_number: event.blockNumber,
              dispatch_at: blockData.timestamp,
              event_type: event_type,
              user_address: event.returnValues.user,
              match_id: event.returnValues.matchID,
              bet_type: event.returnValues.betType,
              bet_place: event.returnValues.betPlace,
              bet_amount: event.returnValues.amount,
            })

            // let bets = await BetCountModel.query()
            //   .where('match_id', event.returnValues.matchID)
            //   .andWhere('user_address', event.returnValues.user)
            //   .first()

            // if (bets) {
            //   await BetCountModel.query()
            //     .where('match_id', event.returnValues.matchID)
            //     .andWhere('user_address', event.returnValues.user)
            //     .update({
            //       bet_count: bets.bet_count + 1,
            //     })
            // } else {
            //   let betCountData = new BetCountModel()
            //   betCountData.match_id = event.returnValues.matchID
            //   betCountData.user_address = event.returnValues.user
            //   betCountData.bet_count = 1
            //   await betCountData.save()
            // }

            break
          case USER_CLAIM:
            const bet = await BettingModel.query()
              .where('match_id', event.returnValues.matchID)
              .andWhere('user_address', event.returnValues.user)
              .andWhere('bet_type', event.returnValues.betType)
              .first()
            if (bet) {
              await BettingModel.query()
                .where('match_id', event.returnValues.matchID)
                .andWhere('user_address', event.returnValues.user)
                .andWhere('bet_type', event.returnValues.betType)
                .update({
                  has_claim: true,
                })
            }
            break
          case USER_PREDICT:
            payloads.push({
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

            // let betss = await BetCountModel.query()
            //   .where('match_id', event.returnValues.matchID)
            //   .andWhere('user_address', event.returnValues.user)
            //   .first()

            // if (betss) {
            //   await BetCountModel.query()
            //     .where('match_id', event.returnValues.matchID)
            //     .andWhere('user_address', event.returnValues.user)
            //     .update({
            //       bet_count: betss.bet_count + 1,
            //     })
            // } else {
            //   let betCountData = new BetCountModel()
            //   betCountData.match_id = event.returnValues.matchID
            //   betCountData.user_address = event.returnValues.user
            //   betCountData.bet_count = 1
            //   await betCountData.save()
            // }

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
      }
    } catch (error) {
      Logger.error(error)
    }
  }
  public onCompleted(job) {
    job.remove()
  }
}
