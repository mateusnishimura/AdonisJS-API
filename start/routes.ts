/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post("/user", "UserController.create")
Route.get("/user", "UserController.index")//.middleware('auth')
Route.get("/aulas/:id", "UserController.show")//.middleware('auth')
Route.delete("/user/:id", "UserController.delete")//.middleware('auth')
Route.put("/user/:id", "UserController.update")//.middleware('auth')

Route.post("/salas", "SalasController.create").middleware('auth')
Route.get("/salas", "SalasController.index").middleware('auth')
Route.delete("/salas/:number", "SalasController.delete").middleware('auth')
Route.put("/salas/:number", "SalasController.update").middleware('auth')

Route.post("/cadastra", "SalasController.alocaAluno").middleware('auth')
Route.delete("/remove/:number", "SalasController.removeAluno").middleware('auth')

Route.post("/auth", "AuthController.login")