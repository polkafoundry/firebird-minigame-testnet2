import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Offers extends BaseSchema {
  protected tableName = 'offers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.bigInteger('market_item_id').notNullable().defaultTo(-1)
      table.string('token_address').notNullable().defaultTo('')
      table.string('token_id').notNullable().defaultTo('')
      table.string('transaction_hash')
      table.integer('transaction_index').unsigned().nullable()
      table.string('event_type')
      table.integer('block_number').unsigned().nullable()
      table.string('buyer').notNullable().defaultTo('')
      table.string('seller').notNullable().defaultTo('')
      table.decimal('price', 40,0)
      table.string('currency').notNullable().defaultTo('')
      table.integer('dispatch_at').notNullable()
      table.string('status').notNullable().defaultTo('')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      // indexes
      // table.unique(['transaction_hash', 'transaction_index']);
      table.unique(['token_address', 'token_id', 'buyer'])
      table.index('token_address')
      table.index('block_number')
      table.index('event_type')
      table.index('dispatch_at')
      table.index(['token_address', 'token_id'])
      table.index(['event_type', 'token_address'])
      table.index('status')
      table.index('market_item_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
