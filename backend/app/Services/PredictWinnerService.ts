const HelperUtils = require('@ioc:App/Common/HelperUtils')

export default class PredictWinnerService {
  public MatchModel = require('@ioc:App/Models/Match')
  public PredictModel = require('@ioc:App/Models/Predict')
  public PredictWinner = require('@ioc:App/Models/PredictWinner')
  public BettingModel = require('@ioc:App/Models/Betting')
  public Database = require('@ioc:Adonis/Lucid/Database')

  public async checkPredictByMatch(request): Promise<any> {
    const matchID = request.input('match_id')
    const address = request.input('address')

    if (!address) return HelperUtils.responseErrorInternal('Wallet address required')
    if (!matchID) return HelperUtils.responseErrorInternal('Match ID required')

    try {
      const predictInfo = await this.PredictModel.query()
        .where('match_id', matchID)
        .andWhere('user_address', address)
        .first()
      if (!predictInfo) {
        return HelperUtils.responseErrorInternal('User not predict in this match')
      }
      const matchInfo = await this.MatchModel.query().where('match_id', matchID).first()
      if (!matchInfo) {
        return HelperUtils.responseErrorInternal('Match not found')
      }
      const predictWinnerInfo = await this.PredictWinner.query().where('match_id', matchID).first()
      if (matchInfo?.is_full_time) {
        return HelperUtils.responseSuccess({
          home_score_predict: predictInfo.home_score,
          away_score_predict: predictInfo.away_score,
          predict_time: predictInfo.predict_time,
          predict_winner:
            predictInfo.home_score == matchInfo.ft_home_score &&
            predictInfo.away_score == matchInfo.ft_away_score,
          is_final_winner: predictWinnerInfo ? predictWinnerInfo?.final_winner : null,
        })
      } else {
        return HelperUtils.responseSuccess({
          home_score_predict: predictInfo.home_score,
          away_score_predict: predictInfo.away_score,
          predict_time: predictInfo.predict_time,
        })
      }
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }

  public async predictCountByMatch({ request }): Promise<any> {
    const round = request.input('round') || 1
    try {
      let sub = this.Database.from('predicts')
        .where('result', true)
        .select('match_id')
        .count('* as total')
        .groupBy('match_id')

      let predictInMatch = await this.Database.from('matchs')
        .joinRaw(
          `LEFT JOIN ( ${sub.toQuery()} ) as predict_result ON predict_result.match_id = matchs.match_id`
        )
        .joinRaw(`LEFT JOIN predict_winners ON matchs.match_id = predict_winners.match_id`)
        .select('matchs.match_id')
        .select('home_name')
        .select('away_name')
        .select('home_icon')
        .select('away_icon')
        .select('start_time')
        .select('predict_result.total')
        .select('final_winner')
        .select('rewards')
        .where('matchs.round_name', round)
        .where('matchs.is_full_time', true)
        .where('matchs.is_pick_predict_final_winners', true)
        .orderBy('match_id', 'DESC')

      return HelperUtils.responseSuccess(predictInMatch)
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }

  public async getListPredictWinner({ request }): Promise<any> {
    const matchID = request.input('match_id')

    if (!matchID) return HelperUtils.responseErrorInternal('Match ID required')

    try {
      const matchInfo = await this.MatchModel.query().where('match_id', matchID).first()
      if (!matchInfo) {
        return HelperUtils.responseErrorInternal('Match not found')
      }

      const predictList = await this.PredictModel.query()
        .where('match_id', matchID)
        .andWhere('result', true)
        .andWhere('match_predicted', true)
        .exec()
      const predictWinner = await this.PredictWinner.query().where('match_id', matchID).first()

      if (!predictList || predictList.length === 0) {
        return HelperUtils.responseErrorInternal('Not predict winner in match')
      }
      return HelperUtils.responseSuccess({
        listWinner: predictList,
        finalWinner: predictWinner?.final_winner,
        rewards: predictWinner?.rewards,
        tx: predictWinner?.transaction_hash,
      })
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }

  public async updatePredictStatus(request): Promise<any> {
    const matchID = request.input('match_id')
    try {
      let match = await this.MatchModel.query()
        .where('is_full_time', true)
        .andWhere('match_id', matchID)
        .andWhere('is_pick_predict_final_winners', false)
        .first()

      if (!match) {
        return HelperUtils.responseErrorInternal('Not match')
      }

      let predict = await this.PredictModel.query()
        .where('match_predicted', false)
        .where('match_id', match.match_id)
        .first()
      if (!predict) {
        return HelperUtils.responseErrorInternal('Not predict')
      }
      await this.PredictModel.query()
        .where('match_id', match.match_id)
        .where('home_score', match.ft_home_score)
        .where('away_score', match.ft_away_score)
        .where('match_predicted', false)
        .update({ result: true, match_predicted: true })
      await this.PredictModel.query()
        .where('match_id', match.match_id)
        .where('match_predicted', false)
        .update({ result: false, match_predicted: true })
    } catch (error) {
      console.log('CalcPredictJob', error)
    }
  }

  public async getUserPredictHistory(request): Promise<any> {
    try {
      const address = request.input('address')
      const page = request.input('page') || 1
      const limit = request.input('limit') || 10
      const status = request.input('status') //true, false

      if (!address) return HelperUtils.responseErrorInternal('User address required')
      let filterResultQuery = status === undefined ? '' : `AND result = ${status}`

      let [total, wins, finalWinner, predicts] = await Promise.all([
        this.Database.from('predicts').count('* as total').where('user_address', address),
        this.Database.from('predicts')
          .count('* as total')
          .where('user_address', address)
          .andWhere('result', true),
        this.Database.from('predict_winners').count('* as total').where('final_winner', address),
        this.Database.from('predicts AS p')
          .joinRaw(`INNER JOIN matchs AS m ON p.match_id = m.match_id`)
          .joinRaw(`LEFT JOIN predict_winners AS pw ON p.match_id = pw.match_id`)
          .joinRaw(`WHERE user_address = '${address}'`)
          .joinRaw(filterResultQuery)
          .select('m.home_name')
          .select('m.home_icon')
          .select('m.away_name')
          .select('m.away_icon')
          .select('p.id')
          .select('p.match_id')
          .select('p.home_score')
          .select('p.away_score')
          .select('p.created_at')
          .select('p.result')
          .select('p.match_predicted')
          .select('pw.final_winner')
          .select('pw.rewards')
          .orderBy('p.match_id', 'DESC')
          .paginate(page, limit),
      ])
      return HelperUtils.responseSuccess({
        total: total[0]?.total,
        wins: wins[0]?.total,
        finalWinner: finalWinner[0]?.total,
        predicts,
      })
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }
}
