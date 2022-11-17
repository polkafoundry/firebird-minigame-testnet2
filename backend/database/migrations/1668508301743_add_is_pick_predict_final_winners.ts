import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddIsPickPredictFinalWinners extends BaseSchema {
  protected tableName = 'matchs'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.boolean('is_pick_predict_final_winners').defaultTo(false)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('is_pick_predict_final_winners')
    })
  }
}
