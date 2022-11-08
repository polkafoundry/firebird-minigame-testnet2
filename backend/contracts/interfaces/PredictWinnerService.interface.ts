export default interface PredictWinnerInterface {
  checkPredictByMatch(request): Promise<any>
  getListPredictWinner(request): Promise<any>
  getUserPredictHistory(request): Promise<any>
}
