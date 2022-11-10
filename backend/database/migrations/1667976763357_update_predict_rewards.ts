import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdatePredictRewards extends BaseSchema {
  protected tableName = 'predict_winners'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('rewards').notNullable().defaultTo(0)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('rewards')
    })
  }
}
