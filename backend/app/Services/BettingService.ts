import BaseException from 'App/Exceptions/BaseException'

export default class BettingService {
  public async bettingCalculate(request): Promise<any> {
    const matchID = request.input('match_id')
    // if (isNaN(page) || isNaN(size) || parseInt(page) <= 0 || parseInt(size) <= 0)
    //   throw new InvalidParamException('page or size must be specified as positive number')
    // const MatchModel = require('@ioc:App/Models/Match')
    // let query = MatchModel.query()
    // let listMatch = await query.where('box_id', boxId).where('is_opened', 0).first()
    const Database = require('@ioc:Adonis/Lucid/Database')
    const match = await Database.from('matchs').where('match_id', matchID)
    if (!match) {
      throw new BaseException('match not found')
    }
    const bets = await Database.from('bettings')
      .where('match_id', matchID)
      .whereLike('bet_type', '%ht%')

    return match
  }
}
