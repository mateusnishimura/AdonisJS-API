import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Salas extends BaseSchema {
  protected tableName = 'salas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('number').notNullable().unique() // número da sala
      table.integer('max_capacity').notNullable()
      table.integer('students').defaultTo(0)
      table.boolean('avaliability').defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.integer('created_by').references('id').inTable('users')
      table.string('teacher').references('name').inTable('users').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
