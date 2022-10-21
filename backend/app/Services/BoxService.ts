import BoxServiceInterface from 'Contracts/interfaces/BoxService.interface'
import InvalidParamException from 'App/Exceptions/InvalidParamException'
const BOX_SMART_CONTRACT = process.env.BOX_SMART_CONTRACT
const Const = require('@ioc:App/Common/Const')
import {
  SALE_STATUS_LISTED,
  SALE_STATUS_UNLISTED,
  SORT_BY,
  TYPE_BOX,
} from 'App/Common/GameConstant'

class BoxService implements BoxServiceInterface {
  public async findByBoxId(request): Promise<any> {
    const boxId = request.params().id
    if (!boxId || isNaN(boxId)) throw new InvalidParamException('box id is required')
    const BoxModel = require('@ioc:App/Models/EpicBox')
    let query = BoxModel.query()
    let box = await query.where('box_id', boxId).where('is_opened', 0).first()
    if (box) {
      let result = box.toJSON()
      const Database = require('@ioc:Adonis/Lucid/Database')
      const OfferModel = require('@ioc:App/Models/Offers')
      const highestOffer = await OfferModel.query()
        .where('token_id', boxId)
        .where('token_address', BOX_SMART_CONTRACT)
        .where('status', Const.OFFER_STATUS.OFFERING)
        .orderBy('price', 'desc')
        .first()
      if (highestOffer) {
        const offer = await OfferModel.query()
          .select(Database.raw('CONVERT(price,CHAR) as price'))
          .select('currency')
          .where('id', highestOffer.id)
          .first()
        result.highest_price = offer.price
        result.offer_currency = offer.currency
      } else {
        result.highest_price = '0'
        result.offer_currency = ''
      }

      return result
    } else {
      throw new InvalidParamException('box id not exist or is opened')
    }
  }

  public async getListBox(request): Promise<any> {
    const page = request.input('page')
    const size = request.input('size')
    const { min, max } = request.input('price', {})
    const boxRarity = request.input('level', [])
    const sortBy = request.input('sort_by', 'price_asc')
    const search = request.input('search', '')
    const ownerAddress = request.input('owner_address', '')
    //const isNotDeposited = request.input('is_not_deposited', null)
    let status = request.input('status', [])

    if (isNaN(page) || isNaN(size) || parseInt(page) <= 0 || parseInt(size) <= 0)
      throw new InvalidParamException('page or size must be specified as positive number')

    if (!SORT_BY.some((item) => item.toUpperCase() === sortBy.toUpperCase()))
      throw new InvalidParamException('sort_by invalid')

    if (
      min === null ||
      max === null ||
      isNaN(min) ||
      isNaN(max) ||
      parseFloat(min) >= parseFloat(max)
    )
      throw new InvalidParamException('price invalid')
    // If not set sales status, it will get only listed item
    if (status.length === 0) status = [SALE_STATUS_LISTED]
    let typeBox: any = []

    if (boxRarity.length === 0) typeBox = TYPE_BOX

    for (let type of boxRarity) {
      typeBox.push(TYPE_BOX[type])
    }

    const BoxModel = require('@ioc:App/Models/EpicBox')
    let query = BoxModel.query()
    query.where('is_opened', false)
    query.whereIn('box_rarity', typeBox)

    // Sales status conditions
    if (status.length === 2) {
      query.where((qG) => {
        if (!isNaN(min) && !isNaN(max) && status.some((item) => item === SALE_STATUS_LISTED)) {
          qG.where((qsG) => {
            qsG.where('is_listing', SALE_STATUS_LISTED)
            qsG.whereBetween('box_price', [min, max])
          })
          qG.orWhere((q) => q.where('is_listing', SALE_STATUS_UNLISTED))
        }
      })
    } else {
      if (!isNaN(min) && !isNaN(max) && status.some((item) => item === SALE_STATUS_LISTED)) {
        query.where('is_listing', SALE_STATUS_LISTED)
        query.whereBetween('box_price', [min, max])
      } else {
        query.where((q) => q.where('is_listing', SALE_STATUS_UNLISTED))
      }
    }

    if (search) query.where('box_id', 'like', '%' + search + '%')
    if (ownerAddress) query.where('box_owner', ownerAddress)

    if (sortBy) {
      let [column, sort] = sortBy.split('_')
      column = column === 'index' ? 'id' : column
      query.orderBy('box_' + column, sort)
    }

    const result = await query.paginate(page, size)
    const postsJSON = result.serialize()
    return postsJSON
  }

  public async getBoxTransferHistory(request): Promise<any> {
    const page = request.input('page')
    const size = request.input('size')
    const tokenId = request.input('box_id')

    if (isNaN(page) || isNaN(size) || parseInt(page) <= 0 || parseInt(size) <= 0)
      throw new InvalidParamException('Page or size must be specified as positive number')
    if (isNaN(tokenId) || parseInt(tokenId) < 0)
      throw new InvalidParamException('box_id must be specified as positive number')

    const MarketplaceHistoryItem = require('@ioc:App/Models/MarketplaceHistoryItem')
    let query = MarketplaceHistoryItem.query()
    query.where('token_id', tokenId)
    query.where('token_address', BOX_SMART_CONTRACT)
    query.orderBy('dispatch_at', 'desc')
    const result = await query.paginate(page, size)
    const postsJSON = result.serialize()
    return postsJSON
  }

  public async findOffersByBoxId(request): Promise<any> {
    const tokenId = request.params().id

    if (!tokenId || isNaN(tokenId)) throw new InvalidParamException('box_id id is required')
    const OfferModel = require('@ioc:App/Models/Offers')

    let offerQuery = OfferModel.query()
      .where('token_id', tokenId)
      .where('token_address', BOX_SMART_CONTRACT)
      .where('status', Const.OFFER_STATUS.OFFERING)
      .orderBy('price', 'desc')
      .orderBy('dispatch_at', 'asc')
    const result = await offerQuery.exec()
    const postsJSON = result.map((post) => post.serialize())
    return postsJSON
  }

  public async findOffersByBuyerAddress(request): Promise<any> {
    const buyer = request.input('buyer', null)
    const page = request.input('page')
    const size = request.input('size')

    if (!buyer) throw new InvalidParamException('buyer is required')
    const Database = require('@ioc:Adonis/Lucid/Database')
    let sub2 = Database.from('offers')
      .select('token_id')
      .max('price as highest_price')
      .where('status', 'OFFERING')
      .groupBy('token_id')
      .groupBy('token_address')
    let offerQuery = Database.from('offers')
      .join('epic_boxes', 'offers.token_id', '=', 'epic_boxes.box_id')
      .joinRaw(
        'inner join (' + sub2.toQuery() + ') as highest on offers.token_id = highest.token_id'
      )
      .select('offers.token_address')
      .select('offers.token_id')
      .select('offers.buyer')
      .select('offers.seller')
      .select('offers.currency')
      .select(Database.raw('CONVERT(offers.price,CHAR) as price'))
      .select('offers.status')
      .select(Database.raw('CONVERT(highest_price,CHAR) as highest_price'))
      .select('epic_boxes.box_name')
      .select('epic_boxes.market_item_id')
      .select('epic_boxes.box_description')
      .select('epic_boxes.box_rarity')
      .select('epic_boxes.is_listing')
      .select(Database.raw('CONVERT(epic_boxes.box_price,CHAR) as box_price'))
      .select('epic_boxes.box_image')

    offerQuery.where('offers.buyer', buyer)
    offerQuery.where('offers.status', Const.OFFER_STATUS.OFFERING)
    offerQuery.where('offers.token_address', BOX_SMART_CONTRACT)
    return await offerQuery.paginate(page, size)
  }

  public async findOffersBySellerAddress(request): Promise<any> {
    const seller = request.input('seller', null)
    const page = request.input('page')
    const size = request.input('size')

    if (!seller) throw new InvalidParamException('seller is required')

    const Database = require('@ioc:Adonis/Lucid/Database')
    let offerQuery = Database.from((subQuery) => {
      subQuery
        .from('offers')
        .select('token_id')
        .select('token_address')
        .select('currency')
        .select(Database.raw('MAX(price) as highest_price'))
        .groupBy('token_id')
        .groupBy('token_address')
        .groupBy('currency')
        .where('offers.status', Const.OFFER_STATUS.OFFERING)
        .where('offers.token_address', BOX_SMART_CONTRACT)
        .whereIn(
          'token_id',
          Database.from('epic_boxes').select('box_id').where('box_owner', seller)
        )
        .as('order_highest')
    })
      .select('order_highest.token_id')
      .select('order_highest.token_address')
      .select('order_highest.currency')
      .select('order_highest.highest_price')
      .select('offers.dispatch_at')
      .select('offers.id')
      .select('offers.buyer')
      .joinRaw(
        'left join offers ' +
          'on offers.token_id = order_highest.token_id ' +
          'and offers.token_address = order_highest.token_address ' +
          'and offers.currency = order_highest.currency ' +
          'and offers.price = order_highest.highest_price'
      )

    console.log(offerQuery.toQuery())
    //console.log("offers id = " + offerIds)
    const highestPriceOffers = await offerQuery.exec()

    // Collect offers.id of highest-earliest offer
    let hashOffers = new Map<number, { id: number; dispatchAt: number }>()

    if (highestPriceOffers && Array.isArray(highestPriceOffers)) {
      highestPriceOffers.forEach((item) => {
        if (!hashOffers.has(item.token_id)) {
          hashOffers.set(item.token_id, { id: item.id, dispatchAt: item.dispatch_at })
        } else {
          const existDispatch = hashOffers.get(item.token_id)?.dispatchAt
          if (existDispatch && item.dispatch_at < existDispatch) {
            hashOffers.set(item.token_id, {
              id: item.id,
              dispatchAt: item.dispatch_at,
            })
          }
        }
      })
    }
    const offerIds = Array.from(hashOffers.values()).map((item) => item.id)
    let query = Database.from('offers')
      .select('offers.token_address')
      .select('offers.token_id')
      .select('offers.buyer')
      .select('offers.seller')
      .select('offers.currency')
      .select(Database.raw('CONVERT(offers.price,CHAR) as highest_price'))
      .select('epic_boxes.box_name')
      .select('epic_boxes.box_description')
      .select('epic_boxes.box_rarity')
      .select('epic_boxes.market_item_id')
      .select('epic_boxes.is_listing')
      .select(Database.raw('CONVERT(epic_boxes.box_price,CHAR) as box_price'))
      .select('epic_boxes.box_image')
      .joinRaw('left join epic_boxes on epic_boxes.box_id = offers.token_id')
      .where('offers.token_address', BOX_SMART_CONTRACT)
      .whereIn('offers.id', offerIds)

    return await query.paginate(page, size)
  }
}
export default BoxService
