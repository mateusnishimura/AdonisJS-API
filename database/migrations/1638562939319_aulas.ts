import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Aulas extends BaseSchema {
  protected tableName = 'aulas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('name_teacher').notNullable()
      table.integer('num_sala').notNullable()

      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
