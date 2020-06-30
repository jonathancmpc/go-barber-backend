import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  /* Procurando a data selecionada pelo cliente em nosso banco de dados de agendamento, pode retornar o Appointment ou Null caso não houver */
  // O retorno de uma função assincrona sempre vai ser uma promisse
  public async findByDate(date: Date): Promise<Appointment | null> {
    // Encontrar um Appointment ONDE date seja igual a date que está sendo passada como parâmetro
    const findAppointment = await this.findOne({
      where: { date },
    });

    /* Se tiver agendamento nessa data, retorna a data, se não retorna null */
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
