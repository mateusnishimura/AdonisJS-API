# DesafioClicksoft
API em Node.js utilizando AdonisJS para o controle da alocação de salas para alunos e professores pelas universidades/alunos.

Para clonar o repositório:
`$ git clone https://github.com/mateusnishimura/DesafioClicksoft.git`

Para a instalação das dependências do projeto:
`$ yarn`

Para gerar as migrations dentro do banco de dados:
`$ node ace migration:run`

Variáveis de ambientes utilizadas no arquivo .env:

    PORT=3333
    HOST=0.0.0.0
    NODE_ENV=development
    APP_KEY=IunyGMD0IpFL39crqnOJoqs-SI4CKp8y
    DRIVE_DISK=local
    DB_CONNECTION=sqlite
    
 Para rodar o servidor:
 `node ace serve --watch` ou `yarn dev`
 
### Rotas da aplicação
┌───────────┬─────────────────┬─────────────────────────────┬────────────┬───────────────────┐
│ Method    │ Route           │ Handler                     │ Middleware │ Name              │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ POST      │ /user           │ UserController.create       │            │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ HEAD, GET │ /user           │ UserController.index        │            │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ HEAD, GET │ /aulas/:id      │ UserController.show         │            │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ DELETE    │ /user/:id       │ UserController.delete       │            │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ PUT       │ /user/:id       │ UserController.update       │            │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ POST      │ /salas          │ SalasController.create      │ auth       │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ HEAD, GET │ /salas          │ SalasController.index       │ auth       │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ DELETE    │ /salas/:number  │ SalasController.delete      │ auth       │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ PUT       │ /salas/:number  │ SalasController.update      │ auth       │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ POST      │ /cadastra       │ SalasController.alocaAluno  │ auth       │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ DELETE    │ /remove/:number │ SalasController.removeAluno │ auth       │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
│ POST      │ /auth           │ AuthController.login        │            │                   │
├───────────┼─────────────────┼─────────────────────────────┼────────────┼───────────────────┤
