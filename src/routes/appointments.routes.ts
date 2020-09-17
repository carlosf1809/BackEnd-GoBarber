import {response, Router} from 'express'
import { parseISO} from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
{/*
    starOfHour: zera os milisegundos da data
    parseISO: passa o valor de "date (string)" para um valor de Data nativo do JS
    isEqual: metodo para verificar se duas datas são iguais no mesmo horario 

    ROTA: 

    *Receber a requisição, chamar outro arquivo, devolver uma resposta
*/}

const appointmentsRouter = Router();
const appoitmentsRepository = new AppointmentsRepository


appointmentsRouter.get('/', (request,response) => {
    const appointments = appoitmentsRepository.all();

    return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
    try{
        const { provider, date}  = request.body

        const parsedDate = parseISO(date);

        const CreateAppoint = new CreateAppointmentService(appoitmentsRepository);

        const appointment = CreateAppoint.execute({date: parsedDate ,provider})
        
        return response.json(appointment)
    }

        catch (err) {
            return response.status(400).json({error: err.message })
        }
    
});

export default appointmentsRouter;