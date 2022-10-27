import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

class Match extends BaseModel {
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

  //bet statistics
  @column({ columnName: 'ou_ht_home' })
  public ou_ht_home: number

  @column({ columnName: 'ou_ht_ratio' })
  public ou_ht_ratio: number

  @column({ columnName: 'ou_ht_away' })
  public ou_ht_away: number

  @column({ columnName: 'ou_ft_home' })
  public ou_ft_home: number

  @column({ columnName: 'ou_ft_ratio' })
  public ou_ft_ratio: number

  @column({ columnName: 'ou_ft_away' })
  public ou_ft_away: number

  @column({ columnName: 'odds_ht_home' })
  public odds_ht_home: number

  @column({ columnName: 'odds_ht_draw' })
  public odds_ht_draw: number

  @column({ columnName: 'odds_ht_away' })
  public odds_ht_away: number

  @column({ columnName: 'odds_ft_home' })
  public odds_ft_home: number

  @column({ columnName: 'odds_ft_draw' })
  public odds_ft_draw: number

  @column({ columnName: 'odds_ft_away' })
  public odds_ft_away: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

module.exports = Match
