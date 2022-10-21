import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

class EpicBox extends BaseModel {
  public static table = 'epic_boxes'
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'transaction_hash', serializeAs: null })
  public transaction_hash: string

  @column({ columnName: 'transaction_index', serializeAs: null })
  public transaction_index: number

  @column({ columnName: 'block_number', serializeAs: null })
  public block_number: number

  @column({ columnName: 'dispatch_at' })
  public dispatch_at: number

  @column({ columnName: 'event_type' })
  public event_type: string

  @column({ columnName: 'box_event_id' })
  public box_event_id: number

  @column({ columnName: 'box_address', serializeAs: null })
  public box_address: string

  @column({ columnName: 'box_id' })
  public box_id: number

  @column({ columnName: 'box_event_type' })
  public box_event_type: string

  @column({ columnName: 'box_owner' })
  public box_owner: string

  @column({ columnName: 'box_uri' })
  public box_uri: string

  @column({ columnName: 'box_name' })
  public box_name: string

  @column({ columnName: 'box_image' })
  public box_image: string

  @column({ columnName: 'box_image_3d' })
  public box_image_3d: string

  @column({ columnName: 'box_image_3d_1k' })
  public box_image_3d_1k: string

  @column({ columnName: 'box_image_3d_2k' })
  public box_image_3d_2k: string

  @column({ columnName: 'box_description' })
  public box_description: string

  @column({ columnName: 'box_rarity' })
  public box_rarity: string

  @column({ columnName: 'market_item_id' })
  public market_item_id: number

  @column({
    columnName: 'box_price',
    serialize: (value: number | null) => {
      return value ? value.toLocaleString('fullwide', { useGrouping: false }) : value
    },
  })
  public box_price: number

  @column({ columnName: 'box_currency' })
  public box_currency: string

  @column({ columnName: 'nft_id' })
  public nft_id: number

  @column({ columnName: 'is_listing' })
  public is_listing: boolean

  @column({ columnName: 'is_opened' })
  public is_opened: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

module.exports = EpicBox
