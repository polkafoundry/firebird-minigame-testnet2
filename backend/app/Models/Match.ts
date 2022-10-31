import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

class Match extends BaseModel {
  public static table = 'matchs'
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

  @column({ columnName: 'match_id' })
  public match_id: number

  @column({ columnName: 'sofa_match_id' })
  public sofa_match_id: number

  @column({ columnName: 'start_time' })
  public start_time: number

  @column({ columnName: 'home_name' })
  public home_name: string

  @column({ columnName: 'ht_home_score' })
  public ht_home_score: number

  @column({ columnName: 'ft_home_score' })
  public ft_home_score: number

  @column({ columnName: 'away_name' })
  public away_name: string

  @column({ columnName: 'ht_away_score' })
  public ht_away_score: number

  @column({ columnName: 'ft_away_score' })
  public ft_away_score: number

  @column({ columnName: 'stadium' })
  public stadium: string

  @column({ columnName: 'round_name' })
  public round_name: string

  @column({ columnName: 'is_half_time' })
  public is_half_time: boolean

  @column({ columnName: 'is_full_time' })
  public is_full_time: boolean

  //bet statistics
  @column({ columnName: 'ou_ht_over' })
  public ou_ht_over: number

  @column({ columnName: 'ou_ht_ratio' })
  public ou_ht_ratio: number

  @column({ columnName: 'ou_ht_under' })
  public ou_ht_under: number

  @column({ columnName: 'ou_ft_over' })
  public ou_ft_over: number

  @column({ columnName: 'ou_ft_ratio' })
  public ou_ft_ratio: number

  @column({ columnName: 'ou_ft_under' })
  public ou_ft_under: number

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
