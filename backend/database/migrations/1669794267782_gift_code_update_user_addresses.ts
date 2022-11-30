import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GiftCodeUpdateUserAddresses extends BaseSchema {
  protected tableName = 'gift_code_histories'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('user_address').alter()
    })
  }

  public async down() {}
}
