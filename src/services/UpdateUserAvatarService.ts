import {getRepository} from 'typeorm';

import AppError from '../erros/AppErro';
import fs from 'fs';
import uploadConfig from '../config/upload';
import path from 'path';
import User from '../models/User';


interface Request{
    user_id: string,
    avatarFileName: string;
}

class UpdateUserAvatarService{
    public async execute({user_id, avatarFileName}: Request): Promise<User>{
        const usersRespository = getRepository(User);

        //encontrando usuario
        const user = await usersRespository.findOne(user_id);
    
        //usuario nao encontrado minhas
        if(!user){
            throw new AppError('avatar nao encontrado', 401);
        }

        //usuario encontrado

        if (user.avatar){
            //deletar avatar anterior

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await usersRespository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService