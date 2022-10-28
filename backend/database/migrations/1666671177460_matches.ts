import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Matches extends BaseSchema {
  protected tableName = 'matches'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('tournament')
      table.string('home_team_name').notNullable()
      table.string('home_team_slug').notNullable()
      table.string('away_team_name').notNullable()
      table.string('away_team_slug').notNullable()
      table.integer('status')
      table.string('status_type')
      table.integer('winner')
      table.integer('round')
      table.text('result')
      table.string('slug').notNullable()
      table.integer('start_time').unsigned()
      table.string('custom_id').notNullable().unique()
      table.integer('match_id').unsigned().notNullable().unique()
      table.boolean('is_create_match_contract').defaultTo(false)
      table.string('create_match_tx')
      table.tinyint('create_match_status').unsigned().defaultTo(0)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.datetime('created_at')
      table.datetime('updated_at')

      table.unique(['round', 'slug'])
      table.unique(['match_id', 'custom_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
