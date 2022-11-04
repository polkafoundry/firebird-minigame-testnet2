import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BetCounts extends BaseSchema {
  protected tableName = 'bet_counts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('user_address').notNullable()
      table.integer('match_id').notNullable()
      table.integer('bet_count').notNullable().defaultTo(0)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
