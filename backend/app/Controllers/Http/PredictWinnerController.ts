import PredictWinnerService from '@ioc:Firebird/PredictWinnerService'

export default class PredictWinnerController {
  public async checkPredictByMatch({ request }) {
    return await PredictWinnerService.checkPredictByMatch(request)
  }
  public async getListPredictWinner({ request }) {
    return await PredictWinnerService.getListPredictWinner(request)
  }

  public async getUserPredictHistory({ request }) {
    return await PredictWinnerService.getUserPredictHistory(request)
  }
}
