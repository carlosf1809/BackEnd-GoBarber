import Appointment from '../models/Appointment';

import {EntityRepository, Repository} from 'typeorm'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
    
        const comparaDuasDatas = await this.findOne({
            where:{ date},
        })

        return comparaDuasDatas || null;
    }
}

export default AppointmentsRepository;