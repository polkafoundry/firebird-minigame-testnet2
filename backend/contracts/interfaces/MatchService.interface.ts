export default interface MatchServiceInterface {
  findByMatchId(tokenId: number): Promise<any>
  getListMatch(request): Promise<any>
  getUpcomingMatch(request): Promise<any>
  getLiveMatch(request): Promise<any>
}
