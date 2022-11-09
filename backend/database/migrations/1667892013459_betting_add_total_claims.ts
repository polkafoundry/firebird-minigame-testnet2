import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BettingAddTotalClaims extends BaseSchema {
  protected tableName = 'bettings'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.decimal('total_claim', 40, 0)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('total_claim')
    })
  }
}
