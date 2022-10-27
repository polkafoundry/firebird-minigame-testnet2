import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

class Betting extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'match_id' })
  public match_id: number

  @column({ columnName: 'bet_type' })
  public bet_type: string

  @column({ columnName: 'bet_place' })
  public bet_place: string

  // bet value
  @column({ columnName: 'bet_statistics' })
  public bet_statistics: number

  // over - under goal number
  @column({ columnName: 'ou_statistics' })
  public ou_statistics: number

  @column({ columnName: 'bet_amount' })
  public bet_amount: number

  @column({ columnName: 'result' })
  public result: string

  @column({ columnName: 'result_num' })
  public result_num: number

  @column({ columnName: 'has_claim' })
  public has_claim: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

module.exports = Betting
