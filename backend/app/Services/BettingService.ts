import BaseException from 'App/Exceptions/BaseException'

export default class BettingService {
  public async ouHTCalculate(request): Promise<any> {
    const matchID = request.input('match_id')
    if (!matchID) {
      throw new BaseException('Match ID is required')
    }
    const MatchModel = require('@ioc:App/Models/Match')
    const BettingModel = require('@ioc:App/Models/Betting')

    const match = await MatchModel.query().where('match_id', matchID).first()
    if (!match) {
      throw new BaseException('match not found')
    }
    if (!match?.is_half_time) {
      throw new BaseException('match not half time')
    }
    const ouHTBets = await BettingModel.query()
      .where('match_id', matchID)
      .andWhere('bet_type', 'ou_ht')
    if (!ouHTBets) {
      throw new BaseException('not found bet in match')
    }
    for (let i = 0; i < ouHTBets.length; i++) {
      let amount = ouHTBets[i]?.bet_amount
      if (match.ou_ht_ratio > match.ht_home_score + match.ht_away_score) {
        // ratio > total score
        await BettingModel.query()
          .where('id', ouHTBets[i]?.id)
          .update({
            bet_statistics: match.ou_ht_over,
            ou_statistics: match.ou_ht_ratio,
            result: ouHTBets[i]?.bet_place === 'under' ? 'win' : 'lose',
            result_num:
              ouHTBets[i]?.bet_place === 'under' ? match.ou_ht_under * amount - amount : -amount,
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
              ouHTBets[i]?.bet_place === 'over' ? match.ou_ht_over * amount - amount : -amount,
          })
      } else {
        //ratio = total score
        await BettingModel.query().where('id', ouHTBets[i]?.id).update({
          bet_statistics: match.ou_ht_over,
          ou_statistics: match.ou_ht_ratio,
          result: 'draw',
          result_num: 0,
        })
      }
    }
    return ouHTBets
  }
  public async ouFTCalculate(request): Promise<any> {
    const matchID = request.input('match_id')
    if (!matchID) {
      throw new BaseException('Match ID is required')
    }
    const MatchModel = require('@ioc:App/Models/Match')
    const BettingModel = require('@ioc:App/Models/Betting')

    const match = await MatchModel.query().where('match_id', matchID).first()
    if (!match) {
      throw new BaseException('match not found')
    }
    if (!match?.is_full_time) {
      throw new BaseException('match not fulltime')
    }

    const ouFTBets = await BettingModel.query()
      .where('match_id', matchID)
      .andWhere('bet_type', 'ou_ft')
    if (!ouFTBets) {
      throw new BaseException('not found bet in match')
    }
    for (let i = 0; i < ouFTBets.length; i++) {
      let amount = ouFTBets[i]?.bet_amount
      if (match.ou_ft_ratio > match.ft_home_score + match.ft_away_score) {
        // ratio > total score
        await BettingModel.query()
          .where('id', ouFTBets[i]?.id)
          .update({
            bet_statistics: match.ou_ft_over,
            ou_statistics: match.ou_ft_ratio,
            result: ouFTBets[i]?.bet_place === 'under' ? 'win' : 'lose',
            result_num:
              ouFTBets[i]?.bet_place === 'under' ? match.ou_ft_under * amount - amount : -amount,
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
              ouFTBets[i]?.bet_place === 'over' ? match.ou_ft_over * amount - amount : -amount,
          })
      } else {
        //ratio = total score
        await BettingModel.query().where('id', ouFTBets[i]?.id).update({
          bet_statistics: match.ou_ft_over,
          ou_statistics: match.ou_ft_ratio,
          result: 'draw',
          result_num: 0,
        })
      }
    }
    return ouFTBets
  }
  public async oddsHTCalculate(request): Promise<any> {
    const matchID = request.input('match_id')
    if (!matchID) {
      throw new BaseException('Match ID is required')
    }
    const MatchModel = require('@ioc:App/Models/Match')
    const BettingModel = require('@ioc:App/Models/Betting')

    const match = await MatchModel.query().where('match_id', matchID).first()
    if (!match) {
      throw new BaseException('match not found')
    }
    if (!match?.is_half_time) {
      throw new BaseException('match not half time')
    }

    const oddsHTBets = await BettingModel.query()
      .where('match_id', matchID)
      .andWhere('bet_type', 'odds_ht')
    if (!oddsHTBets) {
      throw new BaseException('not found bet in match')
    }
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
              oddsHTBets[i]?.bet_place === 'home' ? match.odds_ht_home * amount - amount : -amount,
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
              oddsHTBets[i]?.bet_place === 'away' ? match.odds_ht_away * amount - amount : -amount,
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
              oddsHTBets[i]?.bet_place === 'draw' ? match.odds_ht_draw * amount - amount : -amount,
          })
      }
    }
    return oddsHTBets
  }
  public async oddsFTCalculate(request): Promise<any> {
    const matchID = request.input('match_id')
    if (!matchID) {
      throw new BaseException('Match ID is required')
    }
    const MatchModel = require('@ioc:App/Models/Match')
    const BettingModel = require('@ioc:App/Models/Betting')

    const match = await MatchModel.query().where('match_id', matchID).first()
    if (!match) {
      throw new BaseException('match not found')
    }
    if (!match?.is_full_time) {
      throw new BaseException('match not fulltime')
    }

    const oddsFTBets = await BettingModel.query()
      .where('match_id', matchID)
      .andWhere('bet_type', 'odds_ft')
    if (!oddsFTBets) {
      throw new BaseException('not found bet in match')
    }
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
              oddsFTBets[i]?.bet_place === 'home' ? match.odds_ft_home * amount - amount : -amount,
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
              oddsFTBets[i]?.bet_place === 'away' ? match.odds_ft_away * amount - amount : -amount,
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
              oddsFTBets[i]?.bet_place === 'draw' ? match.odds_ft_draw * amount - amount : -amount,
          })
      }
    }
    return oddsFTBets
  }
  public async predictPickWinner(request): Promise<any> {
    const matchID = request.input('match_id')
    if (!matchID) {
      throw new BaseException('Match ID is required')
    }
    const MatchModel = require('@ioc:App/Models/Match')
    const PredictModel = require('@ioc:App/Models/Predict')

    const match = await MatchModel.query().where('match_id', matchID).first()
    if (!match) {
      throw new BaseException('match not found')
    }
    if (!match?.is_full_time) {
      throw new BaseException('match not fulltime')
    }

    const userPredict = await PredictModel.query()
      .where('match_id', matchID)
      .andWhere('home_score', match?.ft_home_score)
      .andWhere('away_score', match?.ft_away_score)
    if (!userPredict) {
      throw new BaseException('not found predict in match')
    }

    return userPredict
  }
}
