import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserLog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'status' })
  public status: string

  @column({ columnName: 'type' })
  public type: string

  @column({ columnName: 'user_address' })
  public user_address: string

  @column({ columnName: 'match_id' })
  public match_id: number

  @column({ columnName: 'bet_type' })
  public bet_type: string

  @column({ columnName: 'home_score' })
  public home_score: number

  @column({ columnName: 'away_score' })
  public away_score: number

  @column({ columnName: 'amount' })
  public amount: number

  @column({ columnName: 'ping_time' })
  public ping_time: number

  @column({ columnName: 'error_text' })
  public error_text: string

  @column({ columnName: 'ip_address' })
  public ip_address: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
module.exports = UserLog
