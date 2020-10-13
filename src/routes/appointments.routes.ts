import {response, Router} from 'express'
import { parseISO} from 'date-fns'
import {getCustomRepository} from 'typeorm'
import CreateAppointmentService from '../services/CreateAppointmentService'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
{/*
    starOfHour: zera os milisegundos da data
    parseISO: passa o valor de "date (string)" para um valor de Data nativo do JS
    isEqual: metodo para verificar se duas datas são iguais no mesmo horario 

    ROTA: 

    *Receber a requisição, chamar outro arquivo, devolver uma resposta
*/}

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request,response) => {
    const appoitmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appoitmentsRepository.find();

    return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
        const { provider_id, date}  = request.body

        const parsedDate = parseISO(date);

        const CreateAppoint = new CreateAppointmentService();

        const appointment = await CreateAppoint.execute({date: parsedDate, provider_id})
        
        return response.json(appointment)
    });

export default appointmentsRouter;