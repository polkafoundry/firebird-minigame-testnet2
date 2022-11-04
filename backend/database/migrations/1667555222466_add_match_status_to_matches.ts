import BaseSchema from '@ioc:Adonis/Lucid/Schema'
const Const = require('App/Common/Const')

export default class AddMatchStatusToMatches extends BaseSchema {
  protected tableName = 'matchs'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('match_status').defaultTo(Const.MATCH_STATUS.UPCOMING)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('match_status')
    })
  }
}
