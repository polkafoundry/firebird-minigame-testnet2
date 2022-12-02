import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddGiftCodeStartTimes extends BaseSchema {
  protected tableName = 'gift_codes'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('start_time')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('start_time')
    })
  }
}
