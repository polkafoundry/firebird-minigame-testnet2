import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Matchs extends BaseSchema {
  protected tableName = 'matchs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('transaction_hash')
      table.integer('transaction_index').unsigned().nullable()
      table.integer('block_number').unsigned().nullable()
      table.integer('dispatch_at').notNullable()
      table.string('event_type')

      table.integer('match_id').unsigned().nullable()
      table.integer('start_time').unsigned().nullable()
      table.integer('sofa_match_id').notNullable()
      table.string('home_name').notNullable().defaultTo('')
      table.integer('ht_home_score').notNullable().defaultTo(0)
      table.integer('ft_home_score').notNullable().defaultTo(0)
      table.string('away_name').notNullable().defaultTo('')
      table.integer('ht_away_score').notNullable().defaultTo(0)
      table.integer('ft_away_score').notNullable().defaultTo(0)
      table.string('stadium').notNullable().defaultTo('')
      table.string('round_name').notNullable().defaultTo('')
      table.boolean('is_half_time').notNullable().defaultTo(false)
      table.boolean('is_full_time').notNullable().defaultTo(false)

      table.decimal('ou_ht_over').notNullable().defaultTo(0)
      table.decimal('ou_ht_ratio').notNullable().defaultTo(0)
      table.decimal('ou_ht_under').notNullable().defaultTo(0)
      table.decimal('ou_ft_over').notNullable().defaultTo(0)
      table.decimal('ou_ft_ratio').notNullable().defaultTo(0)
      table.decimal('ou_ft_under').notNullable().defaultTo(0)
      table.decimal('odds_ht_home').notNullable().defaultTo(0)
      table.decimal('odds_ht_draw').notNullable().defaultTo(0)
      table.decimal('odds_ht_away').notNullable().defaultTo(0)
      table.decimal('odds_ft_home').notNullable().defaultTo(0)
      table.decimal('odds_ft_draw').notNullable().defaultTo(0)
      table.decimal('odds_ft_away').notNullable().defaultTo(0)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
