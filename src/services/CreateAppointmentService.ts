import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';

interface request{
    provider:string ;
    date: Date;
}

class CreateAppointmentService{ 
    private appoitmentsRepository: AppointmentsRepository

    constructor(appoitmentsRepository: AppointmentsRepository ){
        this.appoitmentsRepository = appoitmentsRepository

    }

    public execute({date, provider }: request): Appointment {
        const appointmentDate = startOfHour(date);
    
    
   const comparaDuasDatas = this.appoitmentsRepository.findByDate(appointmentDate);

    if (comparaDuasDatas){
        throw Error('horário  marcado');
    }

    const appointment = this.appoitmentsRepository.create({
        date: appointmentDate,
        provider,
    });

    return appointment;

    }
}

export default CreateAppointmentService;