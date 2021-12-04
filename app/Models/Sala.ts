import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public number: number

  @column()
  public max_capacity: number

  @column()
  public students: number

  @column()
  public avaliability: boolean

  @column()
  public created_by: number

  @column()
  public teacher:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
