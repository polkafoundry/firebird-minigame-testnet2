import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MarketplaceHistoryItems extends BaseSchema {
  protected tableName = 'marketplace_history_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('transaction_hash')
      table.integer('transaction_index').unsigned().nullable()
      table.integer('block_number').unsigned().nullable()
      table.integer('dispatch_at').notNullable()
      table.string('event_type')

      table.bigInteger('market_item_id').notNullable().defaultTo(-1)
      table.integer('token_id').unsigned().nullable()
      table.string('token_address').notNullable().defaultTo('')
      table.string('buyer').notNullable().defaultTo('')
      table.string('seller').notNullable().defaultTo('')
      table.decimal('price', 40, 0).nullable()
      table.string('currency').notNullable().defaultTo('')

      table.index('token_id')
      table.index('token_address')
      table.index('dispatch_at')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
