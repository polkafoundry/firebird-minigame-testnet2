import MatchService from '@ioc:Firebird/MatchService'

export default class MatchController {
  public async findByMatchId({ request }) {
    return await MatchService.findByMatchId(request)
  }

  public async getListMatch({ request }) {
    return await MatchService.getListMatch(request)
  }
}
