import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddIconToMatches extends BaseSchema {
  protected tableName = 'matchs'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('home_icon').defaultTo('')
      table.string('away_icon').defaultTo('')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('is_calculated_ou_ht')
      table.dropColumn('is_calculated_ou_ft')
      table.dropColumn('is_calculated_odds_ht')
      table.dropColumn('is_calculated_odds_ft')
    })
  }
}
