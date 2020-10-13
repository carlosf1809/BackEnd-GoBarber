import {response, Router} from 'express'
import UserMap from '../userMap/omitPassword'

import AuthenticateUserService from '../services/AuthenticateUserService'


const sessionsRouter = Router();
sessionsRouter.post('/', async (request, response) => {
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

});

export default sessionsRouter;