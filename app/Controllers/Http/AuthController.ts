import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'


export default class AuthController {
    public async login({request, auth, response}: HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')

        const user = await User
            .query()
            .where('email', email)
            .firstOrFail()
        
        if(!(await Hash.verify(user.password, password))){
            return response.badRequest('Credenciais inválidas')
        }
        const token = await auth.use('api').generate(user);
        return token.toJSON()
    }
}
