import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RecalcBetting extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public match_id: number

  @column()
  public bet_type: string

  @column()
  public is_executed: Boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

module.exports = RecalcBetting