import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import appointmentsRepository from '../repositories/AppointmentsRepository';
import AppointmentRepository from '../repositories/AppointmentsRepository';

/* Problemas para resolver no código:
[ X ] Recebimento das informações
[ X ] Tratativas de erros e exceções (Como não temos acesso ao request e response, a única coisa que podemos fazer é implementar o thow. E migramos a resposta ao cliente com o status para a rota)
[ X ] Acesso ao repositório
*/

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  /* Para utilizarmos a mesma instância de repositórios sempre, e não ter erro de ficar criando em cada service um novo repositório(fazendo com que tenhamos repositórios diferentes), instânciamos então através do constructor, passando o repositório como parâmetro. Então importamos o repositório para falar que o tipo do nosso parâmetro é appointmentRepository. ATENÇÃO: quando o Service for chamado na rota, deve-se passar esse parâmetro(repositório) */
  private appointmentsRepository: AppointmentRepository;

  constructor(appointmentsRepository: appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository; /* esse é o que estamos recebendo no constructor como parâmentro, que é o real appointmentsrepository */
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    /* Verifica se existe alguma data igual dentro do nosso banco de dados ficticio, se tiver, ele retorna essa data dentro da variável findAppointmentInSameDate, e se não encontrar nenhuma, retorna false */
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
      // O código de retorno de status foi migrado para rota.
    }

    /* Enviando os parâmetros NOMEADOS como objetos obedecendo o conceito de DTO */
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
