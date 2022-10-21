export default interface MyAccountServiceInterface<T> {
  getMyInformation(request): Promise<any>

  getMyBoxes(request): Promise<any>

  getMyNFTs(request): Promise<any>

  authenticateGoogle(request): Promise<any>

  getAccountByWalletAddress(request): Promise<any>

  getResourcesInGame(request): Promise<any>

  withdrawNFT(request, response): Promise<any>

  withdrawToken(request, response): Promise<any>

  rejectWithdraw(request, response): Promise<any>

  checkAndLinkAccount(walletAddress: string, userInfo: T)

  checkLinkEmailStatus(email: string): Promise<
    | {
        isLinked: boolean
        linkedWallet: string
      }
    | undefined
  >
}
