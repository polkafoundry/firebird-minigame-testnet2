import { JobContract } from '@ioc:Rocketseat/Bull'
import Logger from '@ioc:Adonis/Core/Logger'
const RedisUserBettingUtils = require('@ioc:App/Common/RedisUserBettingUtils')
const HelperUtils = require('@ioc:App/Common/HelperUtils')

const BetCountModel = require('@ioc:App/Models/BetCount')
const BettingModel = require('@ioc:App/Models/Betting')

const USER_BETTING = 'UserBetting'
const USER_CLAIM = 'UserClaim'

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
    const instance = await HelperUtils.getBettingContractInstance()

    const events = await instance.getPastEvents(event_type, {
      fromBlock: from,
      toBlock: to,
    })
    for (const event of events) {
      const blockData = await provider.eth.getBlock(event.blockNumber)
      switch (event_type) {
        case USER_BETTING:
          const userBetting = await BettingModel.query()
            .where('match_id', event.returnValues.matchID)
            .andWhere('user_address', event.returnValues.user)
            .andWhere('bet_type', event.returnValues.betType)
            .first()
          if (userBetting) {
            await BettingModel.query()
              .where('match_id', event.returnValues.matchID)
              .andWhere('user_address', event.returnValues.user)
              .andWhere('bet_type', event.returnValues.betType)
              .update({
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
          } else {
            let bettingData = new BettingModel()
            bettingData.transaction_hash = event.transactionHash
            bettingData.transaction_index = event.transactionIndex
            bettingData.block_number = event.blockNumber
            bettingData.dispatch_at = blockData.timestamp
            bettingData.event_type = event_type
            bettingData.user_address = event.returnValues.user
            bettingData.match_id = event.returnValues.matchID
            bettingData.bet_type = event.returnValues.betType
            bettingData.bet_place = event.returnValues.betPlace
            bettingData.bet_amount = event.returnValues.amount
            await bettingData.save()

            let bets = await BetCountModel.query()
              .where('match_id', event.returnValues.matchID)
              .andWhere('user_address', event.returnValues.user)
              .first()

            if (bets) {
              await BetCountModel.query()
                .where('match_id', event.returnValues.matchID)
                .andWhere('user_address', event.returnValues.user)
                .update({
                  bet_count: bets.bet_count + 1,
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
