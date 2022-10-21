import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EpicBoxes extends BaseSchema {
  protected tableName = 'epic_boxes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('transaction_hash')
      table.integer('transaction_index').unsigned().nullable()
      table.integer('block_number').unsigned().nullable()
      table.integer('dispatch_at').notNullable()
      table.string('event_type')

      table.integer('box_event_id').unsigned().nullable()
      table.string('box_event_type').notNullable().defaultTo('')
      table.string('box_address').notNullable().defaultTo('')
      table.integer('box_id').notNullable().defaultTo(0)
      table.string('box_owner').notNullable().defaultTo('')
      table.string('box_uri').notNullable().defaultTo('')
      table.string('box_name').notNullable().defaultTo('')
      table.decimal('box_price', 40, 0).nullable()
      table.string('box_currency').notNullable().defaultTo('')
      table.integer('nft_id').notNullable().defaultTo(0)
      table.boolean('is_listing').notNullable().defaultTo(false)
      table.boolean('is_opened').notNullable().defaultTo(false)

      table.index('block_number')
      table.index('dispatch_at')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
