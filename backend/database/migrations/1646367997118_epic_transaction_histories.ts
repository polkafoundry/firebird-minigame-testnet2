import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EpicTransactionHistories extends BaseSchema {
  protected tableName = 'epic_transaction_histories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('status').notNullable().defaultTo('pending')
      table.string('transaction_id').notNullable().defaultTo('')
      table.bigInteger('deadline').notNullable().defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
