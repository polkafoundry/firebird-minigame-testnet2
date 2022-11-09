// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BettingService from '@ioc:Firebird/BettingService'

export default class BettingsController {
  public async ouHTCalculate({ request }) {
    return await BettingService.ouHTCalculate(request)
  }
  public async ouFTCalculate({ request }) {
    return await BettingService.ouFTCalculate(request)
  }
  public async oddsHTCalculate({ request }) {
    return await BettingService.oddsHTCalculate(request)
  }
  public async oddsFTCalculate({ request }) {
    return await BettingService.oddsFTCalculate(request)
  }
  public async predictPickWinner({ request }) {
    return await BettingService.predictPickWinner(request)
  }
  public async updatePredictStatus({ request }) {
    return await BettingService.updatePredictStatus(request)
  }
}
