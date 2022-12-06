export default interface BettingServiceInterface {
  ouHTCalculate(request): Promise<any>
  ouFTCalculate(request): Promise<any>
  oddsHTCalculate(request): Promise<any>
  oddsFTCalculate(request): Promise<any>
  getUserBettingHistory(request): Promise<any>
  topUserInfo({ request }): Promise<any>
}
