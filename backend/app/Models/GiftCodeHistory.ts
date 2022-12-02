import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GiftCodeHistory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_address' })
  public user_address: string

  @column({ columnName: 'code' })
  public code: string

  @column({ columnName: 'code_id' })
  public code_id: number

  @column({ columnName: 'time_use' })
  public time_use: number

  @column({ columnName: 'rewards' })
  public rewards: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
module.exports = GiftCodeHistory
