import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddFieldSentToMfAtToBettings extends BaseSchema {
  protected tableName = 'bettings'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('sent_to_mf_at').index()
    })
  }

  public async down() {

  }
}
