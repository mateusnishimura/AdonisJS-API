import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').notNullable().unique() // matricula
      table.string('name').notNullable().unique()
      table.string('email').notNullable().unique()
      table.date('birthday').notNullable()
      table.enu('user_type', ['professor', 'aluno']).notNullable()
      table.timestamp('created_at', { useTz: true })

      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
