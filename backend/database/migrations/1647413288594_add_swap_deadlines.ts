import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddSwapDeadlines extends BaseSchema {
  public async up() {
    this.schema.alterTable('epic_token_swaps', (table) => {
      table.bigInteger('deadline').notNullable().defaultTo(0)
    })
    this.schema.alterTable('epic_nft_swaps', (table) => {
      table.bigInteger('deadline').notNullable().defaultTo(0)
    })
  }

  public async down() {
    this.schema.alterTable('epic_token_swaps', (table) => {
      table.dropColumn('deadline')
    })
    this.schema.alterTable('epic_nft_swaps', (table) => {
      table.dropColumn('deadline')
    })
  }
}
