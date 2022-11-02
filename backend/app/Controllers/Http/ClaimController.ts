import ClaimService from '@ioc:Firebird/ClaimService'

export default class MatchController {
  public async claimToken({ request }) {
    return await ClaimService.claimToken(request)
  }
}
