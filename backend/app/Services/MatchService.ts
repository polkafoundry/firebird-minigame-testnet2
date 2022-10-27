import MatchServiceInterface from 'Contracts/interfaces/MatchService.interface'
import InvalidParamException from 'App/Exceptions/InvalidParamException'

class MatchService implements MatchServiceInterface {
  public async findByMatchId(request): Promise<any> {
    return request.params()
  }

  public async getListMatch(request): Promise<any> {
    const page = request.input('page')
    const size = request.input('size')
    if (isNaN(page) || isNaN(size) || parseInt(page) <= 0 || parseInt(size) <= 0)
      throw new InvalidParamException('page or size must be specified as positive number')
    // const MatchModel = require('@ioc:App/Models/Match')
    // let query = MatchModel.query()
    // let listMatch = await query.where('box_id', boxId).where('is_opened', 0).first()
    const Database = require('@ioc:Adonis/Lucid/Database')
    const matchs = await Database.from('matchs').paginate(page, size)

    return matchs
  }
}
export default MatchService
