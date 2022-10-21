import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddSwapStatuses extends BaseSchema {
  public async up() {
    this.schema.alterTable('epic_token_swaps', (table) => {
      table.dropColumn('is_complete')
      table.string('status').defaultTo('pending')
    })
    this.schema.alterTable('epic_nft_swaps', (table) => {
      table.dropColumn('is_complete')
      table.string('status').defaultTo('pending')
    })
    this.schema.alterTable('epic_transaction_histories', (table) => {
      table.string('event_type')
    })
  }

  public async down() {
    this.schema.alterTable('epic_token_swaps', (table) => {
      table.dropColumn('status')
      table.boolean('is_complete').notNullable().defaultTo(false)
    })
    this.schema.alterTable('epic_nft_swaps', (table) => {
      table.dropColumn('status')
      table.boolean('is_complete').notNullable().defaultTo(false)
    })
    this.schema.alterTable('epic_transaction_histories', (table) => {
      table.dropColumn('event_type')
    })
  }
}
