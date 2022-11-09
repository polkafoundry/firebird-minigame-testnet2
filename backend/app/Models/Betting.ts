import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Betting extends BaseModel {
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

  @column({ columnName: 'user_address' })
  public user_address: string

  @column({ columnName: 'match_id' })
  public match_id: number

  @column({ columnName: 'bet_type' })
  public bet_type: string

  @column({ columnName: 'bet_place' })
  public bet_place: string

  @column({ columnName: 'bet_amount' })
  public bet_amount: number

  // bet value
  @column({ columnName: 'bet_statistics' })
  public bet_statistics: number

  // over - under goal number
  @column({ columnName: 'ou_statistics' })
  public ou_statistics: number

  @column({ columnName: 'result' })
  public result: string

  @column({ columnName: 'result_num' })
  public result_num: number

  @column({ columnName: 'total_claim' })
  public total_claim: number

  @column({ columnName: 'has_claim' })
  public has_claim: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

module.exports = Betting
