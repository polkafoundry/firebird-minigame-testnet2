import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddFieldIsCalculatedToMatches extends BaseSchema {
  protected tableName = 'matchs'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.boolean('is_calculated_ou_ht').defaultTo(false)
      table.boolean('is_calculated_ou_ft').defaultTo(false)
      table.boolean('is_calculated_odds_ht').defaultTo(false)
      table.boolean('is_calculated_odds_ft').defaultTo(false)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table => {
      table.dropColumn('is_calculated_ou_ht')
      table.dropColumn('is_calculated_ou_ft')
      table.dropColumn('is_calculated_odds_ht')
      table.dropColumn('is_calculated_odds_ft')
    }))
  }
}
