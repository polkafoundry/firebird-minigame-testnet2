import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateBoxInfos extends BaseSchema {
  protected tableName = 'update_box_infos'

  public async up () {
      this.schema.alterTable('epic_boxes', (table) => {
        table.string('box_description').notNullable().defaultTo('')
        table.string('box_rarity').notNullable().defaultTo('')
        table.string('box_image').notNullable().defaultTo('')
        table.string('box_image_3d').notNullable().defaultTo('')
        table.string('box_image_3d_1k').notNullable().defaultTo('')
        table.bigInteger('market_item_id').notNullable().defaultTo(-1)
        table.string('box_image_3d_2k').notNullable().defaultTo('')
      })
  
  }

  public async down () {
  }
}
