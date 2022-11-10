import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddFieldIsSentToMfToBettings extends BaseSchema {
  protected tableName = 'bettings'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.boolean('is_sent_to_mf').defaultTo(false)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('is_sent_to_mf')
    })
  }
}
