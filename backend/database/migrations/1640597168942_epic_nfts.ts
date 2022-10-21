import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EpicNfts extends BaseSchema {
  protected tableName = 'epic_nfts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('transaction_hash')
      table.integer('transaction_index').unsigned().nullable()
      table.integer('block_number').unsigned().nullable()
      table.integer('dispatch_at').notNullable()
      table.string('event_type')

      table.integer('nft_id').unsigned().nullable()
      table.string('nft_owner').notNullable().defaultTo('')
      table.string('nft_base_uri').notNullable().defaultTo('')
      table.boolean('can_transfer').notNullable().defaultTo(true)
      table.boolean('is_listing').notNullable().defaultTo(false)

      table.string('description').notNullable().defaultTo('')
      table.string('external_url').notNullable().defaultTo('')
      table.string('image').notNullable().defaultTo('')
      table.string('image_3d').notNullable().defaultTo('')
      table.string('image_3d_1k').notNullable().defaultTo('')
      table.string('image_3d_2k').notNullable().defaultTo('')
      table.string('name').notNullable().defaultTo('')
      table.integer('item_type').notNullable().defaultTo(0)
      table.integer('item_sub').notNullable().defaultTo(0)

      table.integer('armor_penetration').notNullable().defaultTo(0)
      table.string('rate_of_fire').notNullable().defaultTo('')
      table.integer('reload_speed').notNullable().defaultTo(0)
      table.string('ammunition').notNullable().defaultTo('')
      table.integer('weight').notNullable().defaultTo(0)
      table.string('depreciation').notNullable().defaultTo('')

      table.string('rarity_level').notNullable().defaultTo('')
      table.string('role').notNullable().defaultTo('')

      table.index('block_number')
      table.index('event_type')
      table.index('dispatch_at')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
