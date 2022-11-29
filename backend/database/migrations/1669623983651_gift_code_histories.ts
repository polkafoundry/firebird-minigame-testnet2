import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GiftCodeHistories extends BaseSchema {
  protected tableName = 'gift_code_histories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('code_id')
      table.string('code')
      table.integer('user_address')
      table.integer('time_use')
      table.decimal('rewards', 40, 0)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
