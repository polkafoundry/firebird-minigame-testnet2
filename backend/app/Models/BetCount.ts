import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

class BetCount extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_address' })
  public user_address: string

  @column({ columnName: 'match_id' })
  public match_id: number

  @column({ columnName: 'bet_count' })
  public bet_count: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

module.exports = BetCount
