import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Aula extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public num_sala:number

  @column()
  public name_teacher:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
