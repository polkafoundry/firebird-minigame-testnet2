import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SendTransactions extends BaseSchema {
  protected tableName = 'send_transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('address').notNullable()
      table.string('token_address').defaultTo('0x0000000000000000000000000000000000000000')
      table.string('value').defaultTo('0')

      table.string('transaction_hash')
      table.boolean('is_sent').defaultTo(0)

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
