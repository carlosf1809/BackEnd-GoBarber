import {getRepository} from 'typeorm'
import {compare} from 'bcryptjs'
import { sign  } from 'jsonwebtoken' 

import User from '../models/User'
import authConfig from '../config/auth'

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User, 
    token:string;
}

//classe para autenticação do usuario
class AuthenticateUserService{
    public async execute({ email, password }: Request): Promise<Response>{
        const usersRespository = getRepository(User);


        //comparando email
        const user = await usersRespository.findOne({where: { email }});

        if (!user){
            throw new Error('Email ou senha incorreto');
        }

        // user.password - Senha criptografada
        // password - Senha não criptografada


        //comparando senha nao criptografada com senha criptografada
        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new Error('Email ou senha incorreto');
        }


        // Usuário cadastrado


        //gerando token usuario 
        const token = sign({  }, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        } );

        return{
            user,
            token
        };
    }
}

export default AuthenticateUserService