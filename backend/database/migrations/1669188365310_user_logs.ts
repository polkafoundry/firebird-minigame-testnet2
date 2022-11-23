import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserLogs extends BaseSchema {
  protected tableName = 'user_logs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('status') //error, success
      table.string('type') //bet, claim
      table.integer('match_id')
      table.string('user_address')
      table.string('bet_type')
      table.integer('home_score')
      table.integer('away_score')
      table.decimal('amount', 40, 0)
      table.decimal('ping_time', 40, 0)
      table.text('error_text')
      table.string('ip_address')
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
