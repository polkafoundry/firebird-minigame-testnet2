import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bettings extends BaseSchema {
  protected tableName = 'bettings'

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
      table.string('bet_type').notNullable()
      table.string('bet_place').notNullable()
      table.decimal('bet_amount', 40, 0)
      table.decimal('bet_statistics')
      table.decimal('ou_statistics')
      table.string('result') //win - lose - draw
      table.decimal('result_num', 40, 0)
      table.boolean('has_claim').notNullable().defaultTo(false)
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
