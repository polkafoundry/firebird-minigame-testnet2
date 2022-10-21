import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EpicTokenSwaps extends BaseSchema {
  protected tableName = 'epic_token_swaps'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('transaction_hash')
      table.integer('transaction_index').unsigned().nullable()
      table.integer('block_number').unsigned().nullable()
      table.integer('dispatch_at').notNullable()
      table.string('event_type')

      table.string('caller').notNullable().defaultTo('')
      table.decimal('amount', 40, 0).nullable()
      table.boolean('is_complete').notNullable().defaultTo(false)
      table.string('transaction_id').notNullable().defaultTo('')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
