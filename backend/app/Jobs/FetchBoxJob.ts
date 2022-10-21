import { JobContract } from '@ioc:Rocketseat/Bull'
import Logger from '@ioc:Adonis/Core/Logger'
const RedisBoxUtils = require('@ioc:App/Common/RedisBoxUtils')
const EpicBoxModel = require('@ioc:App/Models/EpicBox')
const HelperUtils = require('@ioc:App/Common/HelperUtils')
import CrawlException from 'App/Exceptions/CrawlException'

const { ADDRESS_ZERO } = require('@ioc:App/Common/Const')

const BOX_CREATED = 'BoxCreated'
const BOX_OPENED = 'BoxOpened'
const BOX_TRANSFER = 'Transfer'
const axios = require('axios').default

const STEP = parseInt(process.env.CRAWL_STEP || '5000', 10)

/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/

export default class FetchBoxJob implements JobContract {
  public key = 'FetchBoxJob'

  public async handle(job) {
    const { data } = job

    const eventType = data.event_type
    let from = data.from
    let to = data.to

    if (await RedisBoxUtils.existRedisBoxBlockNumber(eventType)) {
      let redisData = await RedisBoxUtils.getRedisBoxBlockNumber(eventType)
      redisData = JSON.parse(redisData)
      if (redisData && redisData.current) {
        from = redisData.current
      }
    }
    const notCached = data.notCached

    try {
      if (!isNaN(from)) {
        from = parseInt(from)
      }
      if (!isNaN(to)) {
        to = parseInt(to)
      }
      const provider = await HelperUtils.getWeb3Provider()
      const latestBlockNumber = (await provider.eth.getBlockNumber()) - 1
      if (!to || to > latestBlockNumber || to < from) {
        to = latestBlockNumber
      }
      if (from > latestBlockNumber || from >= to) {
        return
      }
      data.to = to
      // fetch
      const startTime = process.hrtime()
      for (let index = from; index < to; index += STEP) {
        let tmp = index + STEP
        if (tmp >= to) {
          tmp = to
        }
        await this.fetchEvents(provider, eventType, index, tmp)
      }
      const endTime = process.hrtime(startTime)
      Logger.info(
        `fetch ${eventType} from ${from} to ${to} in epic_box: ${endTime[0]}s ${
          endTime[1] / 1000000
        }ms`
      )
      if (notCached) {
        return
      }

      await RedisBoxUtils.setRedisBoxBlockNumber({ current: to, event_type: eventType })
    } catch (e) {
      Logger.error(e)
    }
  }

  private async fetchEvents(provider, event_type, from, to) {
    const instance = await HelperUtils.getBoxInstance()
    const events = await instance.getPastEvents(event_type, {
      fromBlock: from,
      toBlock: to,
    })
    // console.log('xxxxxxxxx', event_type, from, to, events)

    for (const event of events) {
      const blockData = await provider.eth.getBlock(event.blockNumber)
      let data = new EpicBoxModel()
      data.transaction_hash = event.transactionHash
      data.transaction_index = event.transactionIndex
      data.block_number = event.blockNumber
      data.dispatch_at = blockData.timestamp
      data.event_type = event_type
      switch (event_type) {
        case BOX_CREATED:
          try {
            const response = await axios.get(
              `${process.env.BOX_METADATA_ENDPOINT}/${event.returnValues.id}`
            )
            if (response) {
              const json = response?.data
              data.box_description = json?.description
              data.external_url = json?.external_url
              data.box_image = json?.image
              data.box_image_3d = json?.image_3d
              data.box_image_3d_1k = json?.image_3d_1k
              data.box_image_3d_2k = json?.image_3d_2k
              data.box_name = json?.name
              for (let index = 0; index < json?.attributes.length; index++) {
                let item = json?.attributes[index]
                if (this.compStr(item.trait_type, 'Box Rarity')) {
                  data.box_rarity = item.value
                }
              }
            }
          } catch (error) {
            Logger.error(
              `error fetch metadata id: ${process.env.BOX_METADATA_ENDPOINT}/${event.returnValues.id}`
            )
          }
          data.box_event_id = event.returnValues.eventId
          data.box_event_type = event.returnValues.eventType
          data.box_address = event.returnValues.boxContractAddress
          data.box_id = event.returnValues.id
          data.box_owner = event.returnValues.boxOwner
          data.box_uri = event.returnValues.boxUri
          data.box_price = event.returnValues.price
          data.box_currency = event.returnValues.currency

          break
        case BOX_OPENED:
          data.box_id = event.returnValues.boxId
          data.nft_id = event.returnValues.nftId
          data.is_opened = true
          break
        case BOX_TRANSFER:
          data.box_id = event.returnValues.tokenId
          break
        default:
          console.log('FetchBoxJob: event not supported', event_type)
          return
      }
      const row = await EpicBoxModel.query().where('box_id', data.box_id).first()
      if (row) {
        switch (event_type) {
          case BOX_CREATED:
            await EpicBoxModel.query().where('box_id', data.box_id).update({
              box_event_id: data.box_event_id,
              box_event_type: data.box_event_type,
              box_address: data.box_address,
              box_id: data.box_id,
              box_uri: data.box_uri,
              box_name: data.box_name,
              box_price: data.box_price,
              box_currency: data.box_currency,
            })
            break
          case BOX_TRANSFER:
            if (
              row.dispatch_at < blockData.timestamp &&
              ![
                ADDRESS_ZERO,
                process.env.MARKETPLACE_SMART_CONTRACT,
                process.env.GAME_SMART_CONTRACT,
              ].some((address) => {
                return address === event.returnValues.to || address === event.returnValues.from
              })
            ) {
              row.event_type = BOX_TRANSFER
              row.dispatch_at = blockData.timestamp
              row.box_owner = event.returnValues.to
              await row.save()
            }
            break
          case BOX_OPENED:
            await EpicBoxModel.query().where('box_id', data.box_id).update({
              nft_id: data.nft_id,
              is_opened: true,
              dispatch_at: blockData.timestamp,
            })
            break
          default:
            console.log('FetchBoxJob: event not supported', event_type)
            return
        }
      } else {
        if (BOX_CREATED === event_type) {
          await data.save()
        } else {
          throw new CrawlException('BOX action event should perform after it created')
        }
      }
    }
  }
  private compStr(str1: string, str2: string): boolean {
    return str1 ? str1.toUpperCase() === str2.toUpperCase() : false
  }
  public onCompleted(job) {
    job.remove()
  }
}
