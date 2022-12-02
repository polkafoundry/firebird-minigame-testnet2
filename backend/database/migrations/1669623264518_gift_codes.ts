import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GiftCodes extends BaseSchema {
  protected tableName = 'gift_codes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('platform')
      table.string('code')
      table.integer('total')
      table.integer('remaining')
      table.integer('expried_time')
      table.integer('create_time')
      table.decimal('rewards', 40, 0)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
