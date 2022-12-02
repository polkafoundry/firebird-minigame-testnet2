import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPredictTableUniques extends BaseSchema {
  protected tableName = 'predicts'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.unique(['user_address', 'match_id'])
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {})
  }
}
