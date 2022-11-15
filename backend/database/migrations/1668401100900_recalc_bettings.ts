import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RecalcBettings extends BaseSchema {
  protected tableName = 'recalc_bettings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('match_id').notNullable()
      table.string('bet_type')
      table.boolean('is_executed').defaultTo('false')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
