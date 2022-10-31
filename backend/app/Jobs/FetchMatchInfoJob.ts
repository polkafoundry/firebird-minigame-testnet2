import { JobContract } from '@ioc:Rocketseat/Bull'
import Logger from '@ioc:Adonis/Core/Logger'
const RedisMatchInfoUtils = require('@ioc:App/Common/RedisMatchInfoUtils')
const HelperUtils = require('@ioc:App/Common/HelperUtils')
const MatchModel = require('@ioc:App/Models/Match')
const BettingModel = require('@ioc:App/Models/Betting')
const PredictModel = require('@ioc:App/Models/Predict')

// import CrawlException from 'App/Exceptions/CrawlException'

// const { ADDRESS_ZERO } = require('@ioc:App/Common/Const')

const CREATE_MATCH = 'CreateMatch'
const UPDATE_MATCH_STATISTICS = 'UpdateMatchStatistics'
const UPDATE_MATCH_INFO = 'UpdateMatchInfo'
const USER_BETTING = 'UserBetting'
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

export default class FetchMatchInfoJob implements JobContract {
  public key = 'FetchMatchInfoJob'

  public async handle(job) {
    const { data } = job

    const eventType = data.event_type
    let from = data.from
    let to = data.to

    if (await RedisMatchInfoUtils.existRedisMatchBlockNumber(eventType)) {
      let redisData = await RedisMatchInfoUtils.getRedisMatchBlockNumber(eventType)
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

      await RedisMatchInfoUtils.setRedisMatchBlockNumber({ current: to, event_type: eventType })
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
    console.log('xxxxx', from, to, events)
    for (const event of events) {
      const blockData = await provider.eth.getBlock(event.blockNumber)
      console.log('xxxxx', event_type)
      switch (event_type) {
        case CREATE_MATCH:
          let data = new MatchModel()
          data.transaction_hash = event.transactionHash
          data.transaction_index = event.transactionIndex
          data.block_number = event.blockNumber
          data.dispatch_at = blockData.timestamp
          data.event_type = event_type
          data.match_id = event.returnValues.matchID
          data.start_time = event.returnValues.mInf.startTime
          data.sofa_match_id = event.returnValues.sofaMatchID
          data.home_name = event.returnValues.mInf.homeName
          data.ht_home_score = event.returnValues.mInf.ht_homeScore
          data.ft_home_score = event.returnValues.mInf.ft_homeScore
          data.away_name = event.returnValues.mInf.awayName
          data.ht_away_score = event.returnValues.mInf.ht_awayScore
          data.ft_away_score = event.returnValues.mInf.ft_awayScore
          data.stadium = event.returnValues.mInf.location
          data.round_name = event.returnValues.mInf.round
          data.is_half_time = event.returnValues.mInf.isHalfTime
          data.is_full_time = event.returnValues.mInf.isFinished

          data.ou_ht_over = event.returnValues.mSta.ouHtOver
          data.ou_ht_ratio = event.returnValues.mSta.ouHtRatio
          data.ou_ht_under = event.returnValues.mSta.ouHtUnder
          data.ou_ft_over = event.returnValues.mSta.ouFtOver
          data.ou_ft_ratio = event.returnValues.mSta.ouFtRatio
          data.ou_ft_under = event.returnValues.mSta.ouFtUnder
          data.odds_ht_home = event.returnValues.mSta.oddsHtHome
          data.odds_ht_draw = event.returnValues.mSta.oddsHtDraw
          data.odds_ht_away = event.returnValues.mSta.oddsHtAway
          data.odds_ft_home = event.returnValues.mSta.oddsFtHome
          data.odds_ft_draw = event.returnValues.mSta.oddsFtDraw
          data.odds_ft_away = event.returnValues.mSta.oddsFtAway

          await data.save()
          break
        case UPDATE_MATCH_STATISTICS:
          await MatchModel.query().where('match_id', event.returnValues.matchID).update({
            ouht_home: event.returnValues.mSta.ouHtHome,
            ouht_ratio: event.returnValues.mSta.ouHtRatio,
            ouht_away: event.returnValues.mSta.ouHtAway,
            ouft_home: event.returnValues.mSta.ouFtHome,
            ouft_ratio: event.returnValues.mSta.ouFtRatio,
            ouft_away: event.returnValues.mSta.ouFtAway,
            odds_ht_home: event.returnValues.mSta.oddsHtHome,
            odds_ht_draw: event.returnValues.mSta.oddsHtDraw,
            odds_ht_away: event.returnValues.mSta.oddsHtAway,
            odds_ft_home: event.returnValues.mSta.oddsFtHome,
            odds_ft_draw: event.returnValues.mSta.oddsFtDraw,
            odds_ft_away: event.returnValues.mSta.oddsFtAway,
          })
          break
        case UPDATE_MATCH_INFO:
          await MatchModel.query().where('match_id', event.returnValues.matchID).update({
            start_time: event.returnValues.mSta.startTime,
            home_name: event.returnValues.mSta.homeName,
            home_score: event.returnValues.mSta.homeScore,
            away_name: event.returnValues.mSta.awayName,
            away_score: event.returnValues.mSta.awayScore,
          })
          break
        case USER_BETTING:
          let bettingData = new BettingModel()
          bettingData.transaction_hash = event.transactionHash
          bettingData.transaction_index = event.transactionIndex
          bettingData.block_number = event.blockNumber
          bettingData.dispatch_at = blockData.timestamp
          bettingData.event_type = event_type
          bettingData.match_id = event.returnValues.matchID
          bettingData.bet_type = event.returnValues.betType
          bettingData.bet_place = event.returnValues.betPlace
          bettingData.bet_amount = event.returnValues.amount

          await bettingData.save()
          break
        case USER_PREDICT:
          let predictData = new PredictModel()
          predictData.transaction_hash = event.transactionHash
          predictData.transaction_index = event.transactionIndex
          predictData.block_number = event.blockNumber
          predictData.dispatch_at = blockData.timestamp
          predictData.event_type = event_type
          predictData.match_id = event.returnValues.matchID
          predictData.home_score = event.returnValues.homeScore
          predictData.away_score = event.returnValues.awayScore
          predictData.predict_time = event.returnValues.time
          await predictData.save()
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
