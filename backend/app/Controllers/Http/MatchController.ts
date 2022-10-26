import MatchService from '@ioc:Firebird/MatchService'

export default class BoxController {
  public async detail({ request }) {
    return await MatchService.findByMatchId(request)
  }

  public async getBoxTransferHistory({ request }) {
    return await MatchService.getListMatch(request)
  }
}
