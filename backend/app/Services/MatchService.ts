import MatchServiceInterface from 'Contracts/interfaces/MatchService.interface'

class MatchService implements MatchServiceInterface {
  public async findByMatchId(request): Promise<any> {
    return request.params()
  }

  public async getListMatch(request): Promise<any> {
    return request.params()
  }
}
export default MatchService
