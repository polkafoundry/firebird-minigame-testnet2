import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddNonceTransactionHistories extends BaseSchema {
  public async up() {
    this.schema.alterTable('epic_transaction_histories', (table) => {
      table.integer('nonce').unsigned().nullable()
    })

    this.schema.alterTable('epic_transaction_histories', (table) => {
      table.string('wallet_address').notNullable().defaultTo('')
    })
    
  }

  public async down() {
    this.schema.alterTable('epic_transaction_histories', (table) => {
      table.dropColumn('nonce')
    })

    this.schema.alterTable('epic_transaction_histories', (table) => {
      table.dropColumn('wallet_address')
    })
  }
}
