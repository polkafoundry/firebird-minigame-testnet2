import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddBettingTableUniques extends BaseSchema {
  protected tableName = 'bettings'

  public async up() {
    // this.schema.table(this.tableName, (table) => {
    //   table.unique(['user_address', 'match_id', 'bet_type'])
    // })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {})
  }
}
