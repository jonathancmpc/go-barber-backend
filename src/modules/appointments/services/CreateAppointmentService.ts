import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  private appointmentsRepository: IAppointmentsRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    /* Extraindo somente a hora */
    const appointmentDate = startOfHour(date);

    /* Verifica se existe alguma data igual dentro do banco de dados, se tiver, ele retorna essa data dentro da variável findAppointmentInSameDate, e se não encontrar nenhuma, retorna false */
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    /* Se tiver uma data repetida, retorna erro */
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
      // O código de retorno de status foi migrado para o server.
    }

    /* Não é necessário ser assíncrono pq ele só cria, quem salva no banco é o save */
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
