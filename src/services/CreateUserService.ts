import {getRepository} from 'typeorm'
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

        const user = usersRespository.create({
            name,
            email,
            password,
        })

        await usersRespository.save(user);

        return user; 
    }
}
export default CreateUserService;