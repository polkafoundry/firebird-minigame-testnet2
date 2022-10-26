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
      table.string('home_name').notNullable().defaultTo('')
      table.integer('home_score').notNullable().defaultTo(0)
      table.string('away_name').notNullable().defaultTo('')
      table.integer('away_score').notNullable().defaultTo(0)

      table.integer('ouht_home').notNullable().defaultTo(0)
      table.integer('ouht_ratio').notNullable().defaultTo(0)
      table.integer('ouht_away').notNullable().defaultTo(0)
      table.integer('ouft_home').notNullable().defaultTo(0)
      table.integer('ouft_ratio').notNullable().defaultTo(0)
      table.integer('ouft_away').notNullable().defaultTo(0)
      table.integer('odds_ht_home').notNullable().defaultTo(0)
      table.integer('odds_ht_draw').notNullable().defaultTo(0)
      table.integer('odds_ht_away').notNullable().defaultTo(0)
      table.integer('odds_ft_home').notNullable().defaultTo(0)
      table.integer('odds_ft_draw').notNullable().defaultTo(0)
      table.integer('odds_ft_away').notNullable().defaultTo(0)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
