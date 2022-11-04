import MatchService from '@ioc:Firebird/MatchService'
const HelperUtils = require('@ioc:App/Common/HelperUtils')

export default class MatchController {
  public async findByMatchId({ request }) {
    return await MatchService.findByMatchId(request)
  }

  public async getListMatch({ request }) {
    try {
      const matches = await MatchService.getListMatch(request)
      return HelperUtils.responseSuccess(matches)
    } catch (error) {
      return HelperUtils.responseErrorInternal(error.message)
    }
  }

  public async getUpcomingMatch({ request }) {
    try {
      const upcomingMatches = await MatchService.getUpcomingMatch(request)
      return HelperUtils.responseSuccess(upcomingMatches)
    } catch (error) {
      return HelperUtils.responseErrorInternal(error.message)
    }

  }
  public async getLiveMatch({ request }) {
    try {
      const liveMatches = await MatchService.getLiveMatch(request)
      return HelperUtils.responseSuccess(liveMatches)
    } catch (error) {
      return HelperUtils.responseErrorInternal(error.message)
    }

  }
  public async getMatchDetail({ request, params }) {
    try {
      let match = await MatchService.findByMatchId({ id: params.match_id, wallet_address: request.input('wallet_address') })
      if (!match) return HelperUtils.responseBadRequest('Match id not found')
      match = JSON.parse(JSON.stringify(match))

      return HelperUtils.responseSuccess({
        ...match,
        is_completed_bet: (match.bettings.length + match.predicts.length) == 5
      })
    } catch (error) {
      return HelperUtils.responseErrorInternal(error.message)
    }

  }
}
