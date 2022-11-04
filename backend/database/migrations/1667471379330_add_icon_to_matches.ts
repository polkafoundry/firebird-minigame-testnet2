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
      table.dropColumn('home_icon')
      table.dropColumn('away_icon')
    })
  }
}
