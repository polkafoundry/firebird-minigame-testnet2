export default interface MatchServiceInterface {
  findByMatchId(data): Promise<any>
  getListMatch(request): Promise<any>
  getUpcomingMatch(request): Promise<any>
  getLiveMatch(request): Promise<any>
}
