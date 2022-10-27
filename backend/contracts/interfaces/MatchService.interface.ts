export default interface MatchServiceInterface {
  findByMatchId(tokenId: number): Promise<any>
  getListMatch(request): Promise<any>
}
