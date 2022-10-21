import BoxService from '@ioc:EpicWar/BoxService'

export default class BoxController {
  public async detail({ request }) {
    return await BoxService.findByBoxId(request)
  }

  public async getBoxTransferHistory({ request }) {
    return await BoxService.getBoxTransferHistory(request)
  }

  public async boxList({ request }) {
    return await BoxService.getListBox(request)
  }

  public async getOffersByBoxId({ request }) {
    const offers = await BoxService.findOffersByBoxId(request)
    return offers
  }

  public async findOffersByBuyerAddress({request}) {
    const offers = await BoxService.findOffersByBuyerAddress(request)
    return offers
  }

  public async findOffersBySellerAddress({request}) {
    const offers = await BoxService.findOffersBySellerAddress(request)
    return offers
  }

}
