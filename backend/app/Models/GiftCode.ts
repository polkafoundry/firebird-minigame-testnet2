import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GiftCode extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'platform' })
  public platform: string

  @column({ columnName: 'code' })
  public code: string

  @column({ columnName: 'total' })
  public total: number

  @column({ columnName: 'remaining' })
  public remaining: number

  @column({ columnName: 'expried_time' })
  public expried_time: number

  @column({ columnName: 'start_time' })
  public start_time: number

  @column({ columnName: 'create_time' })
  public create_time: number

  @column({ columnName: 'rewards' })
  public rewards: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
module.exports = GiftCode
