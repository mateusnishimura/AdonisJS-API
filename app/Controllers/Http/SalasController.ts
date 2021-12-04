import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sala from "App/Models/Sala"
import User from 'App/Models/User';
import Aula from 'App/Models/Aula';
import Database from '@ioc:Adonis/Lucid/Database';

export default class SalasController {
    public async create({ request, response, auth }: HttpContextContract){
        const tipo = auth.user?.user_type;
        const created_by = auth.user?.id
        if(tipo !== 'professor'){
            return response.status(401).send('Não autorizado')
        }
        const {number, max_capacity, avaliability} = 
            request.only(['number', 'max_capacity', 'avaliability'])
        const teacher = auth.user?.name
        const sala = await Sala.create({number, max_capacity, avaliability, created_by, teacher})

        return response.status(204).json(sala);
    }

    public async index({ auth, response }: HttpContextContract){
        const tipo = auth.user?.user_type;
        if(tipo !== 'professor'){
            return response.status(401).send('Não autorizado')
        }
        const salas = await Sala.all();
        return salas
    }

    public async delete({params, auth, response}:HttpContextContract){
        const tipo = auth.user?.user_type;
        if(tipo !== 'professor'){
            return response.status(401).send('Não autorizado')
        }
        const sala = await Sala.findOrFail(params.number)
        await sala.delete();
    }

    public async update({request, auth, response, params}: HttpContextContract){
        const tipo = auth.user?.user_type;

        if(tipo !== 'professor'){
            return response.status(401).send('Não autorizado')
        }
        const {number, max_capacity} = request.only(['number', 'max_capacity'])

        const sala = await Sala.findOrFail(params.number)
        sala.number = number
        sala.max_capacity = max_capacity
        await sala.save();
    }

    public async alocaAluno({request, auth, response}: HttpContextContract){
        const matricula = request.only(['matricula', 'num_sala'])
        let user = await User.findOrFail(matricula.matricula)
        let sala = await Sala.findOrFail(matricula.num_sala)

        if(user.user_type === 'professor'){
            return response.status(401).send('Não é um aluno')
        }

        if(sala.created_by !== auth.user?.id){
            return response.status(401).send('Esta sala não foi criada por você')
        }

        if(sala.avaliability == false){
            return response.status(400).send('Capacidade máxima atingida')
        }

        sala.students += 1

        if(sala.students === sala.max_capacity){
            sala.avaliability = false;
        }

        const {name} = await Database.from('users').where('id', matricula.matricula).select('name').first()
        const jaCadastrado = await Database.from('aulas').where('name', name).where('num_sala', matricula.num_sala).first()

        if(jaCadastrado)
            return response.status(400).send('Aluno já está cadastrado nessa aula')

        Aula.create({num_sala:matricula.num_sala, name: user.name, name_teacher: auth.user?.name})

        await sala.save();
    }

    public async removeAluno({request, auth, response, params}: HttpContextContract){
        const {num_sala} = request.only(['num_sala'])
        const matricula = params.number
        let user = await User.findOrFail(matricula)
        let sala = await Sala.findOrFail(num_sala)

        if(user.user_type === 'professor'){
            return response.status(401).send('Não é um aluno')
        }

        if(sala.created_by !== auth.user?.id){
            return response.status(401).send('Esta sala não foi criada por você')
        }

        if(sala.students === 0){
            return response.status(400).send('Não há alunos nesta sala')
        }

        sala.students -= 1
        const {name} = await Database.from('users').where('id', matricula).select('name').first()
        const aula = await Database.from('aulas').where('name', name).where('num_sala', num_sala).delete()

        await sala.save();
    }
}
