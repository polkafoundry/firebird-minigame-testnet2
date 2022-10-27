import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Match extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tournament: string

  @column()
  public home_team_name: string

  @column()
  public home_team_slug: string

  @column()
  public away_team_name: string

  @column()
  public away_team_slug: string

  @column()
  public status: number

  @column()
  public status_type: string

  @column()
  public winner: number

  @column()
  public round: number

  @column()
  public result: string

  @column()
  public slug: string

  @column()
  public start_time: number

  @column()
  public custom_id: string

  @column()
  public match_id: number

  @column()
  public is_create_match_contract: boolean

  @column()
  public create_match_tx: string

  @column()
  public create_match_status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
