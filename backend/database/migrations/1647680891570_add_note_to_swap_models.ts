import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddNoteToSwapModels extends BaseSchema {
  public async up() {
    this.schema.alterTable('epic_token_swaps', (table) => {
      table.string('note')
    })
    this.schema.alterTable('epic_nft_swaps', (table) => {
      table.string('note')
    })
    this.schema.alterTable('epic_transaction_histories', (table) => {
      table.string('note')
    })
  }

  public async down() {
    this.schema.alterTable('epic_token_swaps', (table) => {
      table.dropColumn('note')
    })
    this.schema.alterTable('epic_nft_swaps', (table) => {
      table.dropColumn('note')
    })
    this.schema.alterTable('epic_transaction_histories', (table) => {
      table.dropColumn('note')
    })
  }
}
