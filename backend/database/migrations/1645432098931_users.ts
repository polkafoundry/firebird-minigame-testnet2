import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email').notNullable()
      table.string('wallet_address').notNullable()
      table.string('fullname')
      table.string('picture')
      table.string('user_id')
      table.string('token')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['email'])
      table.unique(['wallet_address'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
