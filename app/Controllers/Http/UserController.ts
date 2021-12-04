import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from "App/Models/User"
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserController {
    public async create({ request, response }: HttpContextContract){
        let {name, email, birthday, id, user_type, password} = 
            request.only(['name', 'email', 'birthday', 'id','user_type', 'password'])
        password = await Hash.make(password);
        const usuario = await User.create({name, email, birthday, id, user_type, password})

        return response.status(204).json(usuario);
    }

    public async index({auth}: HttpContextContract){
        const users = await User.all(); 
        // const user = await User.findOrFail(auth.user?.id);
        return users
    }

    public async delete({params, auth, response}:HttpContextContract){
        const user = await User.findOrFail(params.id) // checa se o id passado existe
        /*
        if(params.id != user.id)
            return response.status(401).send("Você não pode excluir outro usuário")
        */
        await user.delete();
    }

    public async update({request, params, auth, response}: HttpContextContract){
        const check = await User.findOrFail(params.id) // checa se o id passado existe
        /*
        if(params.id != auth.user?.id)
            return response.status(401).send("Você não pode editar os dados de outro usuário")
        */
        const user_changes = request.only(['name', 'email', 'birthday', 'registration'])
        await Database.from('users').where('id', params.id).update({ name: user_changes.name, email: user_changes.email, birthday: user_changes.birthday, id: user_changes.registration})
    }

    public async show({params, response}: HttpContextContract){
        const id = params.id
        const [{name, user_type}] = await Database.from('users').where('id', id).select('name', 'user_type')

        if(user_type === "professor")
            return response.status(401).send("Você não é um aluno")
            
        const aulas = await Database.from('aulas').where('name', name).select('num_sala', 'name_teacher')

        const professores : string[] = []
        const sala_aula : string[] = []
        for(let key in aulas){
            let {name_teacher, num_sala} = aulas[key]
            sala_aula.push(num_sala)
            professores.push(name_teacher)
        }
        const grade = {name, professores, sala_aula}
        return grade
    }
}
