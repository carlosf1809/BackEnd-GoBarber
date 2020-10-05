import {response, Router} from 'express'
import UserMap from '../userMap/omitPassword'

import AuthenticateUserService from '../services/AuthenticateUserService'


const sessionsRouter = Router();
sessionsRouter.post('/', async (request, response) => {
    try{
        const { email, password } = request.body;     
        

        const authenticateUser = new AuthenticateUserService();

        const {user, token} = await authenticateUser.execute({
            email, 
            password 
        });

        //ocultando senha das minhas rotas
        const mappedUser = UserMap.toDTO(user);

        //retornando usuario sem a sua senha 
        return response.json({ mappedUser, token});
    }catch (err) {
        return response.status(400).json({error: err.message })
    }
    
});

export default sessionsRouter;