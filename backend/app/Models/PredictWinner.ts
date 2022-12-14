import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Match from './Match'

export default class PredictWinner extends BaseModel {
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

  @column({ columnName: 'req_id' })
  public req_id: string

  @column({ columnName: 'match_id' })
  public match_id: number

  @column({ columnName: 'predict_winner' })
  public predict_winner: string

  @column({ columnName: 'final_winner' })
  public final_winner: string

  @column({ columnName: 'randomness' })
  public randomness: number

  @column({ columnName: 'rewards' })
  public rewards: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Match, {
    localKey: 'match_id',
    foreignKey: 'match_id',
  })
  public match: HasOne<typeof Match>
}

module.exports = PredictWinner
