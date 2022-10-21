export default interface MarketplaceServiceInterface {
  getList(request): Promise<any>
  findByTokenId(tokenId: number): Promise<any>
  getTokenTransferHistory(tokenId: number): Promise<any>
  findOffersByTokenId(tokenId: number): Promise<any>
  findOffersByBuyerAddress(request): Promise<any>
  findOffersBySellerAddress(request): Promise<any>
}
