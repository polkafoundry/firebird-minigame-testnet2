import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Predicts extends BaseSchema {
  protected tableName = 'predicts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('transaction_hash')
      table.integer('transaction_index').unsigned().nullable()
      table.integer('block_number').unsigned().nullable()
      table.integer('dispatch_at').notNullable()
      table.string('event_type')

      table.string('user_address').notNullable()
      table.integer('match_id').notNullable()
      table.string('home_score').notNullable()
      table.string('away_score').notNullable()
      table.integer('predict_time').notNullable()

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
