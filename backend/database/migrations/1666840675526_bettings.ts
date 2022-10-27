import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bettings extends BaseSchema {
  protected tableName = 'bettings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('match_id').notNullable()
      table.string('bet_type').notNullable()
      table.string('bet_place').notNullable()
      table.integer('bet_statistics').notNullable()
      table.integer('ou_statistics').notNullable().defaultTo(-1)
      table.decimal('bet_num', 40, 0)
      table.string('result').notNullable() //win - lose - draw
      table.decimal('result_num', 40, 0)
      table.boolean('has_claim').notNullable().defaultTo(false)
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
