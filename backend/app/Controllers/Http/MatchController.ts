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
  public async getMatchDetail({ params }) {
    try {
      const match = await MatchService.findByMatchId(params.match_id)
      if (!match) return HelperUtils.responseBadRequest('Match id not found')
      return HelperUtils.responseSuccess(match)
    } catch (error) {
      return HelperUtils.responseErrorInternal(error.message)
    }

  }
}
