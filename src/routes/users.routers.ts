import {response, Router} from 'express'
import CreateUserService from '../services/CreateUserService'
import UserMap from '../userMap/omitPassword'

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try{
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
    }catch (err) {
        return response.status(400).json({error: err.message })
    }
    
});

export default usersRouter;