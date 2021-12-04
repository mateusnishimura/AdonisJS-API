import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public birthday: Date
  
  @column()
  public user_type: string

  @column()
  public password: string

  @column()
  public sala:number

  @column()
  public remember_me_token:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
