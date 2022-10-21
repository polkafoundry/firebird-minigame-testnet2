import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddStatsInfoToEpicNfts extends BaseSchema {
  protected tableName = 'epic_nfts'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('stats_hp').notNullable().comment('HP value').defaultTo(0)
      table.integer('stats_def').notNullable().comment('DEF value').defaultTo(0)
      table.integer('stats_dodge').notNullable().comment('Dodge value').defaultTo(0)
      table.integer('stats_atk').notNullable().comment('ATK value').defaultTo(0)
      table.integer('stats_speed').notNullable().comment('Speed value').defaultTo(0)
      table.integer('stats_focus').notNullable().comment('Focus value').defaultTo(0)

      table.integer('rarity_id').notNullable().defaultTo(-1)
      table.bigInteger('market_item_id').notNullable().defaultTo(-1)

      table.string('currency').nullable().defaultTo('')
      table.decimal('price', 40, 0).nullable()

      table.index('market_item_id')
      table.index('price')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
