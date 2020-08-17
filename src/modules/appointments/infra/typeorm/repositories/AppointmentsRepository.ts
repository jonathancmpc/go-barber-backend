import { getRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

/* Agora AppointmentsRepository tem uma interface chamada IAppointmentsRepository, onde servirá como uma camada que irá chamar todos os métodos de AppointmentsRepository */
class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  /* Procurando a data selecionada pelo cliente em nosso banco de dados de agendamento, pode retornar o Appointment ou Null caso não houver */
  // O retorno de uma função assincrona sempre vai ser uma promisse
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // Encontrar um Appointment ONDE date seja igual a date que está sendo passada como parâmetro
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    /* Se tiver agendamento nessa data, retorna a data, se não retorna undefined */
    return findAppointment || undefined;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
