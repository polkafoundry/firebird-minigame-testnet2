import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPredictResults extends BaseSchema {
  protected tableName = 'predicts'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.boolean('result').defaultTo(false)
      table.boolean('match_predicted').defaultTo(false)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('result')
      table.dropColumn('match_predicted')
    })
  }
}
