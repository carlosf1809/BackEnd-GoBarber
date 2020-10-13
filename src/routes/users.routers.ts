import {response, Router} from 'express'
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import UserMap from '../userMap/omitPassword'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import multer from 'multer';
import uploadConfig from '../config/upload'

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const {name, password, email} = request.body

    const createUser = new CreateUserService();

    const user  = await createUser.execute({
        name,
        email,
        password
    });


    //ocultando senha das minhas rotas
    const mappedUser = UserMap.toDTO(user);

    //retornando usuario sem a sua senha 
    return response.json(mappedUser);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request,response) => {
    try{
            const updateUserAvatar = new UpdateUserAvatarService();

            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFileName: request.file.filename
            })

            return response.json(user)
        }catch(err){
        return response.status(400).json({error: err.message})
    }
});

export default usersRouter;