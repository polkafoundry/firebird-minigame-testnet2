import InvalidParamException from 'App/Exceptions/InvalidParamException'
import BusinessException from 'App/Exceptions/BusinessException'
const HelperUtils = require('@ioc:App/Common/HelperUtils')

export default class PredictWinnerService {
  public async checkPredictByMatch(request, response): Promise<any> {
    const matchID = request.input('match_id')
    const address = request.input('address')

    if (!address) return HelperUtils.responseErrorInternal('Wallet address required')
    if (!matchID) return HelperUtils.responseErrorInternal('Match ID required')

    try {
      const PredictModel = require('@ioc:App/Models/Predict')
      const predictInfo = await PredictModel.query()
        .where('match_id', matchID)
        .andWhere('user_address', address)
        .first()
      if (!predictInfo) {
        return HelperUtils.responseErrorInternal('User not predict in this match')
      }
      const MatchModel = require('@ioc:App/Models/Match')
      const matchInfo = await MatchModel.query().where('match_id', matchID).first()
      if (!matchInfo) {
        return HelperUtils.responseErrorInternal('Match not found')
      }
      const PredictWinner = require('@ioc:App/Models/PredictWinner')
      const predictWinnerInfo = await PredictWinner.query().where('match_id', matchID).first()
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
      const MatchModel = require('@ioc:App/Models/Match')
      const matchInfo = await MatchModel.query().where('match_id', matchID).first()
      if (!matchInfo) {
        return HelperUtils.responseErrorInternal('Match not found')
      }
      const PredictModel = require('@ioc:App/Models/Predict')
      const predictList = await PredictModel.query()
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
}
