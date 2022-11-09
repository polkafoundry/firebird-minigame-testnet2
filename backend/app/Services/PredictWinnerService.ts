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

  public async getListPredictWinner(request): Promise<any> {
    const matchID = request.input('match_id')

    if (!matchID) return HelperUtils.responseErrorInternal('Match ID required')

    try {
      const matchInfo = await this.MatchModel.query().where('match_id', matchID).first()
      if (!matchInfo) {
        return HelperUtils.responseErrorInternal('Match not found')
      }

      const predictList = await this.PredictModel.query()
        .where('match_id', matchID)
        .andWhere('home_score', matchInfo.ft_home_score)
        .andWhere('away_score', matchInfo.ft_away_score)
        .exec()
      if (!predictList || predictList.length === 0) {
        return HelperUtils.responseErrorInternal('Not predict winner in match')
      }
      return HelperUtils.responseSuccess(predictList)
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }

  public async updatePredictStatus(matchID) {
    const match = await this.MatchModel.query().where('match_id', matchID).first()
    const predicts = await this.PredictModel.query()
      .where('match_id', matchID)
      .where('match_predicted', false)
      .exec()
    for (let i = 0; i < predicts.length; i++) {
      if (
        match.ft_home_score == predicts[i].home_score &&
        match.ft_away_score == predicts[i].away_score
      ) {
        await this.PredictModel.query()
          .where('match_id', predicts[i].match_id)
          .where('user_address', predicts[i].user_address)
          .update({
            result: true,
            match_predicted: true,
          })
      } else {
        await this.PredictModel.query()
          .where('match_id', predicts[i].match_id)
          .where('user_address', predicts[i].user_address)
          .update({
            result: false,
            match_predicted: true,
          })
      }
    }
  }

  public async getUserPredictHistory(request): Promise<any> {
    try {
      const address = request.input('address')
      const page = request.input('page') || 1
      const limit = request.input('limit') || 10
      const status = request.input('status') //true, false

      if (!address) return HelperUtils.responseErrorInternal('User address required')

      let [total, wins, finalWinner, predicts] = await Promise.all([
        this.Database.from('predicts').count('* as total').where('user_address', address),
        this.Database.from('predicts')
          .count('* as total')
          .where('user_address', address)
          .andWhere('result', true),
        this.Database.from('predict_winners').count('* as total').where('final_winner', address),
        status !== undefined
          ? this.PredictModel.query()
              .where('user_address', address)
              .where('result', status)
              .orderBy('match_id', 'asc')
              .paginate(page, limit)
          : this.PredictModel.query()
              .where('user_address', address)
              .orderBy('match_id', 'asc')
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
