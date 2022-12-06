import BaseException from 'App/Exceptions/BaseException'
const HelperUtils = require('@ioc:App/Common/HelperUtils')

const BigNumber = require('bignumber.js')

export default class BettingService {
  public MatchModel = require('@ioc:App/Models/Match')
  public BettingModel = require('@ioc:App/Models/Betting')
  public PredictModel = require('@ioc:App/Models/Predict')
  public Database = require('@ioc:Adonis/Lucid/Database')

  public async ouHTCalculate(request): Promise<any> {
    const matchID = request.input('match_id')
    if (!matchID) {
      throw new BaseException('Match ID is required')
    }

    const match = await this.MatchModel.query().where('match_id', matchID).first()
    if (!match) {
      throw new BaseException('match not found')
    }
    if (!match?.is_half_time) {
      throw new BaseException('match not half time')
    }
    const ouHTBets = await this.BettingModel.query()
      .where('match_id', matchID)
      .andWhere('bet_type', 'ou_ht')
    if (!ouHTBets) {
      throw new BaseException('not found bet in match')
    }
    for (let i = 0; i < ouHTBets.length; i++) {
      let amount = ouHTBets[i]?.bet_amount
      if (match.ou_ht_ratio > match.ht_home_score + match.ht_away_score) {
        // ratio > total score
        await this.BettingModel.query()
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
            total_claim:
              ouHTBets[i]?.bet_place === 'under'
                ? new BigNumber(amount).multipliedBy(new BigNumber(match.ou_ht_under)).toFixed()
                : 0,
            is_calculated: true,
          })
      } else if (match.ou_ht_ratio < match.ht_home_score + match.ht_away_score) {
        // ratio < total score
        await this.BettingModel.query()
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
            total_claim:
              ouHTBets[i]?.bet_place === 'over'
                ? new BigNumber(amount).multipliedBy(new BigNumber(match.ou_ht_over)).toFixed()
                : 0,
            is_calculated: true,
          })
      } else {
        //ratio = total score
        await this.BettingModel.query()
          .where('id', ouHTBets[i]?.id)
          .update({
            bet_statistics:
              ouHTBets[i]?.bet_place === 'over' ? match.ou_ht_over : match.ou_ht_under,
            ou_statistics: match.ou_ht_ratio,
            result: 'draw',
            result_num: 0,
            total_claim: ouHTBets[i]?.bet_amount,
            is_calculated: true,
          })
      }
    }
    return true
  }
  public async ouFTCalculate(request): Promise<any> {
    const matchID = request.input('match_id')
    if (!matchID) {
      throw new BaseException('Match ID is required')
    }

    const match = await this.MatchModel.query().where('match_id', matchID).first()
    if (!match) {
      throw new BaseException('match not found')
    }
    if (!match?.is_full_time) {
      throw new BaseException('match not fulltime')
    }

    const ouFTBets = await this.BettingModel.query()
      .where('match_id', matchID)
      .andWhere('bet_type', 'ou_ft')
    if (!ouFTBets) {
      throw new BaseException('not found bet in match')
    }
    for (let i = 0; i < ouFTBets.length; i++) {
      let amount = ouFTBets[i]?.bet_amount
      if (match.ou_ft_ratio > match.ft_home_score + match.ft_away_score) {
        // ratio > total score
        await this.BettingModel.query()
          .where('id', ouFTBets[i]?.id)
          .update({
            bet_statistics: match.ou_ft_under,
            ou_statistics: match.ou_ft_ratio,
            result: ouFTBets[i]?.bet_place === 'under' ? 'win' : 'lose',
            result_num:
              ouFTBets[i]?.bet_place === 'under'
                ? new BigNumber(amount)
                    .multipliedBy(new BigNumber(match.ou_ft_under))
                    .minus(new BigNumber(amount))
                    .toFixed()
                : -amount,
            total_claim:
              ouFTBets[i]?.bet_place === 'under'
                ? new BigNumber(amount).multipliedBy(new BigNumber(match.ou_ft_under)).toFixed()
                : 0,
            is_calculated: true,
          })
      } else if (match.ou_ht_ratio < match.ht_home_score + match.ht_away_score) {
        // ratio < total score
        await this.BettingModel.query()
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
            total_claim:
              ouFTBets[i]?.bet_place === 'over'
                ? new BigNumber(amount).multipliedBy(new BigNumber(match.ou_ft_over)).toFixed()
                : 0,
            is_calculated: true,
          })
      } else {
        //ratio = total score
        await this.BettingModel.query()
          .where('id', ouFTBets[i]?.id)
          .update({
            bet_statistics:
              ouFTBets[i]?.bet_place === 'over' ? match.ou_ft_over : match.ou_ft_under,
            ou_statistics: match.ou_ft_ratio,
            result: 'draw',
            result_num: 0,
            total_claim: ouFTBets[i]?.bet_amount,
            is_calculated: true,
          })
      }
    }
    return true
  }
  public async oddsHTCalculate(request): Promise<any> {
    const matchID = request.input('match_id')
    if (!matchID) {
      throw new BaseException('Match ID is required')
    }

    const match = await this.MatchModel.query().where('match_id', matchID).first()
    if (!match) {
      throw new BaseException('match not found')
    }
    if (!match?.is_half_time) {
      throw new BaseException('match not half time')
    }

    const oddsHTBets = await this.BettingModel.query()
      .where('match_id', matchID)
      .andWhere('bet_type', 'odds_ht')
    if (!oddsHTBets) {
      throw new BaseException('not found bet in match')
    }
    for (let i = 0; i < oddsHTBets.length; i++) {
      let amount = oddsHTBets[i]?.bet_amount
      if (match.ht_home_score > match.ht_away_score) {
        // home win
        await this.BettingModel.query()
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
            total_claim:
              oddsHTBets[i]?.bet_place === 'home'
                ? new BigNumber(amount).multipliedBy(new BigNumber(match.odds_ht_home)).toFixed()
                : 0,
            is_calculated: true,
          })
      } else if (match.ht_home_score < match.ht_away_score) {
        // away win
        await this.BettingModel.query()
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
            total_claim:
              oddsHTBets[i]?.bet_place === 'away'
                ? new BigNumber(amount).multipliedBy(new BigNumber(match.odds_ht_away)).toFixed()
                : 0,
            is_calculated: true,
          })
      } else {
        //draw
        await this.BettingModel.query()
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
            total_claim:
              oddsHTBets[i]?.bet_place === 'draw'
                ? new BigNumber(amount).multipliedBy(new BigNumber(match.odds_ht_draw)).toFixed()
                : 0,
            is_calculated: true,
          })
      }
    }
    return true
  }
  public async oddsFTCalculate(request): Promise<any> {
    const matchID = request.input('match_id')
    if (!matchID) {
      throw new BaseException('Match ID is required')
    }

    const match = await this.MatchModel.query().where('match_id', matchID).first()
    if (!match) {
      throw new BaseException('match not found')
    }
    if (!match?.is_full_time) {
      throw new BaseException('match not fulltime')
    }

    const oddsFTBets = await this.BettingModel.query()
      .where('match_id', matchID)
      .andWhere('bet_type', 'odds_ft')
    if (!oddsFTBets) {
      throw new BaseException('not found bet in match')
    }
    for (let i = 0; i < oddsFTBets.length; i++) {
      let amount = oddsFTBets[i]?.bet_amount
      if (match.ft_home_score > match.ft_away_score) {
        // home win
        await this.BettingModel.query()
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
            total_claim:
              oddsFTBets[i]?.bet_place === 'home'
                ? new BigNumber(amount).multipliedBy(new BigNumber(match.odds_ft_home)).toFixed()
                : 0,
            is_calculated: true,
          })
      } else if (match.ft_home_score < match.ft_away_score) {
        // away win
        await this.BettingModel.query()
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
            total_claim:
              oddsFTBets[i]?.bet_place === 'away'
                ? new BigNumber(amount).multipliedBy(new BigNumber(match.odds_ft_away)).toFixed()
                : 0,
            is_calculated: true,
          })
      } else {
        //draw
        await this.BettingModel.query()
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
            total_claim:
              oddsFTBets[i]?.bet_place === 'draw'
                ? new BigNumber(amount).multipliedBy(new BigNumber(match.odds_ft_draw)).toFixed()
                : 0,
            is_calculated: true,
          })
      }
    }
    return true
  }

  public async getUserBettingHistory(request): Promise<any> {
    try {
      const address = request.input('address')
      const page = request.input('page') || 1
      const limit = request.input('limit') || 10
      const result = request.input('result') //lose, win, draw
      const isClaim = request.input('is_claim')

      let filterResultQuery = result === undefined ? '' : `AND result = '${result}'`
      let claimResultQuery = isClaim === undefined ? '' : `AND has_claim = ${isClaim}`

      let [total, wins, earnedToken, bettings] = await Promise.all([
        this.Database.from('bettings').count('* as total').where('user_address', address),
        this.Database.from('bettings')
          .count('* as total')
          .where('user_address', address)
          .andWhere('result', 'win'),
        this.Database.rawQuery(
          `SELECT SUM(CASE WHEN result_num > 0 then result_num ELSE 0 END) AS total_win FROM bettings WHERE user_address = '${address}'`
        ),
        this.Database.from('bettings as b')
          .joinRaw(`inner join matchs AS m ON b.match_id = m.match_id`)
          .joinRaw(`WHERE user_address = '${address}'`)
          .joinRaw(filterResultQuery)
          .joinRaw(claimResultQuery)
          .select('b.id')
          .select('b.match_id')
          .select('b.bet_place')
          .select('b.bet_type')
          .select('b.bet_amount')
          .select('b.result_num')
          .select('b.total_claim')
          .select('b.result')
          .select('b.created_at')
          .select('b.has_claim')
          .select('b.is_calculated')
          .select('m.home_name')
          .select('m.home_icon')
          .select('m.away_name')
          .select('m.away_icon')
          .orderBy('match_id', 'DESC')
          .orderBy('bet_type', 'DESC')
          .paginate(page, limit),
      ])

      return HelperUtils.responseSuccess({
        total: total[0]?.total,
        wins: wins[0]?.total,
        earnedToken: earnedToken[0][0].total_win,
        bettings,
      })
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }
  public async topUserInfo(request): Promise<any> {
    try {
      let topUser = await this.Database.rawQuery(
        `SELECT user_address, SUM(CASE WHEN result_num > 0 THEN result_num ELSE 0 END) AS total_win, COUNT(*) as total_bet FROM bettings GROUP BY user_address ORDER BY total_win DESC LIMIT 30 OFFSET 0`
      )
      const bettingContract = await HelperUtils.getBirdTokenContractInstance()
      let res: any = []
      for (let i = 0; i < topUser[0].length; i++) {
        let obj = topUser[0][i]
        let [userLogs, giftCodes, predicts, balance] = await Promise.all([
          this.Database.from('user_logs')
            .count('* as total')
            .where('user_address', obj.user_address),
          this.Database.from('gift_code_histories')
            .count('* as total')
            .where('user_address', obj.user_address),
          this.Database.from('predicts')
            .count('* as total')
            .where('user_address', obj.user_address),
          parseInt(await bettingContract.methods.balanceOf(obj.user_address).call()),
        ])
        res.push({
          ...obj,
          logs: userLogs[0].total,
          code: giftCodes[0].total,
          predict: predicts[0].total,
          balance: balance / 1000000000000000000,
        })
      }
      return res
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }
}
