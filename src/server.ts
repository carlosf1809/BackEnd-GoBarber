import 'reflect-metadata'

import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import routes from './routes';
import AppError from './erros/AppErro';
import uploadConfig from './config/upload'

import './database'

const app = express();
app.use('/files', express.static(uploadConfig.directory))
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction)=> {
    if(err instanceof AppError){
        return response.status(err.statusCode). json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message:'Erro interno inesperado'
    })
});

app.listen(3333,()=>{
    console.log('🚀 server started on port 3333 ')
})