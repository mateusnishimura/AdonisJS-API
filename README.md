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

![image](https://user-images.githubusercontent.com/61103951/144722126-c6c453a7-afae-4f12-bd6c-5d9937fe6851.png)

