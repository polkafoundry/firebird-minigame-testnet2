import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PredictWinners extends BaseSchema {
  protected tableName = 'predict_winners'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('transaction_hash')
      table.integer('transaction_index').unsigned().nullable()
      table.integer('block_number').unsigned().nullable()
      table.integer('dispatch_at').notNullable()
      table.string('event_type')

      table.string('req_id').notNullable()
      table.integer('match_id').notNullable()
      table.string('predict_winner').notNullable()
      table.string('final_winner').notNullable()
      table.decimal('randomness', 40, 0)
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
