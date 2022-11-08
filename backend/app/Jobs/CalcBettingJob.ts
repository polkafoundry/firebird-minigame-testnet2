import { JobContract } from '@ioc:Rocketseat/Bull'

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
import BettingModel from 'App/Models/Betting'
import MatchModel from 'App/Models/Match'
import PredictModel from 'App/Models/Predict'

const Const = require('@ioc:App/Common/Const')
const BigNumber = require('bignumber.js')

/* Ranges from 1 (highest priority) to MAX_INT (lowest priority). */
const priority = 2
/* The total number of attempts to try the job until it completes.*/
const attempts = 1

export const calcBettingJob = async (data) => {
  try {
    const jobKey = new CalcBettingJob().key
    await Bull.getByKey(jobKey).bull.add(jobKey, data, {
      priority: priority,
      removeOnComplete: true,
      removeOnFail: true,
      attempts: attempts,
    })
  } catch (e) {
    console.log('error: ', e.message)
    console.error()
  } finally {
  }
}

export default class CalcBettingJob implements JobContract {
  public key = 'CalcBettingJob'

  public async handle(job) {
    const { data } = job
    console.log('CalcBettingJob: ', data)
    // Do somethign with you job data
    const MAX_BETTING_CALC = 5000
    let [match, bettings, predict] = await Promise.all([
      MatchModel.query().where('match_id', data.matchId).first(),
      BettingModel.query()
        .where('match_id', data.matchId)
        .where('bet_type', data.betType)
        .where('is_calculated', false)
        .limit(MAX_BETTING_CALC),
      PredictModel.query()
        .where('match_id', data.matchId)
        .where('match_predicted', false)
        .limit(MAX_BETTING_CALC),
    ])
    bettings = JSON.parse(JSON.stringify(bettings))
    console.log('CalcBettingJob: ', match)
    console.log({ bettings })
    if (!match) return

    const calcFunction = {
      [Const.BET_TYPE.OU_HT]: this._calcOuHtBet,
      [Const.BET_TYPE.OU_FT]: this._calcOuFtBet,
      [Const.BET_TYPE.ODDS_HT]: this._calcOddsHtBet,
      [Const.BET_TYPE.ODDS_FT]: this._calcOddsFtBet,
    }
    await calcFunction[data.betType](match, bettings)

    await this._updatePredictStatus(match, predict)

    if (bettings.length < MAX_BETTING_CALC) {
      const checkingField = {
        [Const.BET_TYPE.OU_HT]: 'is_calculated_ou_ht',
        [Const.BET_TYPE.OU_FT]: 'is_calculated_ou_ft',
        [Const.BET_TYPE.ODDS_HT]: 'is_calculated_odds_ht',
        [Const.BET_TYPE.ODDS_FT]: 'is_calculated_odds_ft',
      }
      const updateObject = {}
      updateObject[checkingField[data.betType]] = true
      console.log({ updateObject })
      await MatchModel.query().where('match_id', data.matchId).update(updateObject)
    }
  }
  private async _calcOuHtBet(match, ouHTBets) {
    for (let i = 0; i < ouHTBets.length; i++) {
      let amount = ouHTBets[i]?.bet_amount
      if (match.ou_ht_ratio > match.ht_home_score + match.ht_away_score) {
        // ratio > total score
        await BettingModel.query()
          .where('id', ouHTBets[i]?.id)
          .update({
            bet_statistics: match.ou_ht_under,
            ou_statistics: match.ou_ht_ratio,
            result: ouHTBets[i]?.bet_place === 'under' ? 'win' : 'lose',
            result_num:
              ouHTBets[i]?.bet_place === 'under'
                ? new BigNumber(amount)
                    .multipliedBy(new BigNumber(match.ou_ht_under))
                    .minus(new BigNumber(amount))
                    .toFixed()
                : -amount,
            is_calculated: true,
          })
      } else if (match.ou_ht_ratio < match.ht_home_score + match.ht_away_score) {
        // ratio < total score
        await BettingModel.query()
          .where('id', ouHTBets[i]?.id)
          .update({
            bet_statistics: match.ou_ht_over,
            ou_statistics: match.ou_ht_ratio,
            result: ouHTBets[i]?.bet_place === 'over' ? 'win' : 'lose',
            result_num:
              ouHTBets[i]?.bet_place === 'over'
                ? new BigNumber(amount)
                    .multipliedBy(new BigNumber(match.ou_ht_over))
                    .minus(new BigNumber(amount))
                    .toFixed()
                : -amount,
            is_calculated: true,
          })
      } else {
        //ratio = total score
        await BettingModel.query()
          .where('id', ouHTBets[i]?.id)
          .update({
            bet_statistics:
              ouHTBets[i]?.bet_place === 'over' ? match.ou_ht_over : match.ou_ht_under,
            ou_statistics: match.ou_ht_ratio,
            result: 'draw',
            result_num: 0,
            is_calculated: true,
          })
      }
    }
  }

  private async _calcOuFtBet(match, ouFTBets) {
    for (let i = 0; i < ouFTBets.length; i++) {
      let amount = ouFTBets[i]?.bet_amount
      if (match.ou_ft_ratio > match.ft_home_score + match.ft_away_score) {
        // ratio > total score
        await BettingModel.query()
          .where('id', ouFTBets[i]?.id)
          .update({
            bet_statistics: match.ou_ft_under,
            ou_statistics: match.ou_ft_ratio,
            result: ouFTBets[i]?.bet_place === 'under' ? 'win' : 'lose',
            result_num:
              ouFTBets[i]?.bet_place === 'under'
                ? new BigNumber(amount)
                    .multipliedBy(new BigNumber(match.ou_ht_under))
                    .minus(new BigNumber(amount))
                    .toFixed()
                : -amount,
            is_calculated: true,
          })
      } else if (match.ou_ht_ratio < match.ht_home_score + match.ht_away_score) {
        // ratio < total score
        await BettingModel.query()
          .where('id', ouFTBets[i]?.id)
          .update({
            bet_statistics: match.ou_ft_over,
            ou_statistics: match.ou_ft_ratio,
            result: ouFTBets[i]?.bet_place === 'over' ? 'win' : 'lose',
            result_num:
              ouFTBets[i]?.bet_place === 'over'
                ? new BigNumber(amount)
                    .multipliedBy(new BigNumber(match.ou_ft_over))
                    .minus(new BigNumber(amount))
                    .toFixed()
                : -amount,
            is_calculated: true,
          })
      } else {
        //ratio = total score
        await BettingModel.query()
          .where('id', ouFTBets[i]?.id)
          .update({
            bet_statistics:
              ouFTBets[i]?.bet_place === 'over' ? match.ou_ft_over : match.ou_ft_under,
            ou_statistics: match.ou_ft_ratio,
            result: 'draw',
            result_num: 0,
            is_calculated: true,
          })
      }
    }
  }
  private async _calcOddsHtBet(match, oddsHTBets) {
    for (let i = 0; i < oddsHTBets.length; i++) {
      let amount = oddsHTBets[i]?.bet_amount
      if (match.ht_home_score > match.ht_away_score) {
        // home win
        await BettingModel.query()
          .where('id', oddsHTBets[i]?.id)
          .update({
            bet_statistics:
              oddsHTBets[i]?.bet_place === 'home'
                ? match.odds_ht_home
                : oddsHTBets[i]?.bet_place === 'away'
                ? match.odds_ht_away
                : match.odds_ht_draw,
            result: oddsHTBets[i]?.bet_place === 'home' ? 'win' : 'lose',
            result_num:
              oddsHTBets[i]?.bet_place === 'home'
                ? new BigNumber(amount)
                    .multipliedBy(new BigNumber(match.odds_ht_home))
                    .minus(new BigNumber(amount))
                    .toFixed()
                : -amount,
            is_calculated: true,
          })
      } else if (match.ht_home_score < match.ht_away_score) {
        // away win
        await BettingModel.query()
          .where('id', oddsHTBets[i]?.id)
          .update({
            bet_statistics:
              oddsHTBets[i]?.bet_place === 'home'
                ? match.odds_ht_home
                : oddsHTBets[i]?.bet_place === 'away'
                ? match.odds_ht_away
                : match.odds_ht_draw,
            result: oddsHTBets[i]?.bet_place === 'away' ? 'win' : 'lose',
            result_num:
              oddsHTBets[i]?.bet_place === 'away'
                ? new BigNumber(amount)
                    .multipliedBy(new BigNumber(match.odds_ht_away))
                    .minus(new BigNumber(amount))
                    .toFixed()
                : -amount,
            is_calculated: true,
          })
      } else {
        //draw
        await BettingModel.query()
          .where('id', oddsHTBets[i]?.id)
          .update({
            bet_statistics:
              oddsHTBets[i]?.bet_place === 'home'
                ? match.odds_ht_home
                : oddsHTBets[i]?.bet_place === 'away'
                ? match.odds_ht_away
                : match.odds_ht_draw,
            result: oddsHTBets[i]?.bet_place === 'draw' ? 'win' : 'lose',
            result_num:
              oddsHTBets[i]?.bet_place === 'draw'
                ? new BigNumber(amount)
                    .multipliedBy(new BigNumber(match.odds_ht_draw))
                    .minus(new BigNumber(amount))
                    .toFixed()
                : -amount,
            is_calculated: true,
          })
      }
    }
  }
  private async _calcOddsFtBet(match, oddsFTBets) {
    for (let i = 0; i < oddsFTBets.length; i++) {
      let amount = oddsFTBets[i]?.bet_amount
      if (match.ft_home_score > match.ft_away_score) {
        // home win
        await BettingModel.query()
          .where('id', oddsFTBets[i]?.id)
          .update({
            bet_statistics:
              oddsFTBets[i]?.bet_place === 'home'
                ? match.odds_ft_home
                : oddsFTBets[i]?.bet_place === 'away'
                ? match.odds_ft_away
                : match.odds_ft_draw,
            result: oddsFTBets[i]?.bet_place === 'home' ? 'win' : 'lose',
            result_num:
              oddsFTBets[i]?.bet_place === 'home'
                ? new BigNumber(amount)
                    .multipliedBy(new BigNumber(match.odds_ft_home))
                    .minus(new BigNumber(amount))
                    .toFixed()
                : -amount,
            is_calculated: true,
          })
      } else if (match.ft_home_score < match.ft_away_score) {
        // away win
        await BettingModel.query()
          .where('id', oddsFTBets[i]?.id)
          .update({
            bet_statistics:
              oddsFTBets[i]?.bet_place === 'home'
                ? match.odds_ft_home
                : oddsFTBets[i]?.bet_place === 'away'
                ? match.odds_ft_away
                : match.odds_ft_draw,
            result: oddsFTBets[i]?.bet_place === 'away' ? 'win' : 'lose',
            result_num:
              oddsFTBets[i]?.bet_place === 'away'
                ? new BigNumber(amount)
                    .multipliedBy(new BigNumber(match.odds_ft_away))
                    .minus(new BigNumber(amount))
                    .toFixed()
                : -amount,
            is_calculated: true,
          })
      } else {
        //draw
        await BettingModel.query()
          .where('id', oddsFTBets[i]?.id)
          .update({
            bet_statistics:
              oddsFTBets[i]?.bet_place === 'home'
                ? match.odds_ft_home
                : oddsFTBets[i]?.bet_place === 'away'
                ? match.odds_ft_away
                : match.odds_ft_draw,
            result: oddsFTBets[i]?.bet_place === 'draw' ? 'win' : 'lose',
            result_num:
              oddsFTBets[i]?.bet_place === 'draw'
                ? new BigNumber(amount)
                    .multipliedBy(new BigNumber(match.odds_ft_draw))
                    .minus(new BigNumber(amount))
                    .toFixed()
                : -amount,
            is_calculated: true,
          })
      }
    }
  }

  private async _updatePredictStatus(match, predicts) {
    for (let i = 0; i < predicts.length; i++) {
      if (
        match.ft_home_score == predicts[i].home_score &&
        match.ft_away_score == predicts[i].away_score
      ) {
        await PredictModel.query()
          .where('match_id', predicts[i].match_id)
          .where('user_address', predicts[i].user_address)
          .update({
            result: true,
            match_predicted: true,
          })
      } else {
        await PredictModel.query()
          .where('match_id', predicts[i].match_id)
          .where('user_address', predicts[i].user_address)
          .update({
            result: false,
            match_predicted: true,
          })
      }
    }
  }
}
