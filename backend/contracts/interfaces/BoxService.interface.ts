export default interface BoxServiceInterface {
  findByBoxId(tokenId: number): Promise<any>
  getListBox(request): Promise<any>
  getBoxTransferHistory(request): Promise<any>
  findOffersByBoxId(request): Promise<any>
  findOffersByBuyerAddress(request): Promise<any>
  findOffersBySellerAddress(request): Promise<any>
}
