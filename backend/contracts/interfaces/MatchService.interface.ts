export default interface BoxServiceInterface {
  findByMatchId(tokenId: number): Promise<any>
  getListMatch(request): Promise<any>
}
