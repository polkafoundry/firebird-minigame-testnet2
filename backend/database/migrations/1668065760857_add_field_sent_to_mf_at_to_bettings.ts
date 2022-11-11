import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddFieldSentToMfAtToBettings extends BaseSchema {
  protected tableName = 'bettings'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.timestamp('sent_to_mf_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('sent_to_mf_at')
    })
  }
}
