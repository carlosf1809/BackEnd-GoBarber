import {getRepository} from 'typeorm'
import { hash  } from 'bcryptjs'

import User from '../models/User'

interface Request {
    name: string,
    email: string,
    password: string
}

class CreateUserService{
    public async execute({name, email, password}: Request): Promise<User>{
        const usersRespository = getRepository(User);

        const checkUsersExists = await usersRespository.findOne({
            where: {email},
        });
        if (checkUsersExists){
            throw new Error('email ja existente');
        }


        //criptografando senha
        const hashedPassword = await hash(password, 8)

        const user = usersRespository.create({
            name,
            email,
            password: hashedPassword,
        });
        

        await usersRespository.save(user);

        return user; 
    }
}
export default CreateUserService;