// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BettingService from '@ioc:Firebird/BettingService'

export default class BettingsController {
  public async bettingCalculate({ request }) {
    return await BettingService.bettingCalculate(request)
  }
}
