import Appointment from '../models/Appointment';
import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';

interface request{
    provider:string ;
    date: Date;
}

class CreateAppointmentService{ 

    public async execute({date, provider }: request): Promise<Appointment> {
        const appoitmentsRepository = getCustomRepository(AppointmentsRepository)

        const appointmentDate = startOfHour(date);
    
    
   const comparaDuasDatas = await appoitmentsRepository.findByDate(appointmentDate);

    if (comparaDuasDatas){
        throw Error('horário  marcado');
    }


    const appointment = appoitmentsRepository.create({
        date: appointmentDate,
        provider,
    });

    //salva no banco de dados
    await appoitmentsRepository.save(appointment);

    return appointment;

    }
}

export default CreateAppointmentService;