import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'

import AppError from '../erros/AppErro';
import authConfig from '../config/auth'
import User from '../models/User';

interface TokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}
export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    //validação do token JWT
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError('Não existe token', 401);
    }

    const [,token] = authHeader.split(' ');

    try{
        const decoded = verify(token, authConfig.jwt.secret);
        const{ sub } = decoded as TokenPayLoad;

        console.log(decoded)

        request.user = {
            id: sub,
        }
        return next();
    }catch {
        throw new AppError('token jwt invalido', 401);
    }
}