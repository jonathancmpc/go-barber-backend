import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

/* Inserindo o conceito de DTO(Data Transfer Object) */
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  /* Criamos uma variável que só será acessada dentro dessa classe que receberá os dados de Appointmens, simulando nosso banco */
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  /* Listar Agendamentos */
  public all(): Appointment[] {
    return this.appointments;
  }

  /* Procurando a data selecionada pelo cliente em nosso banco de dados de agendamento, pode retornar o Appointment ou Null caso não houver */
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    /* Se tiver agendamento nessa data, retorna a data, se não retorna null */
    return findAppointment || null;
  }

  /* Criamos então o método de criação de agendamento público, e para criar o agendamento precisamos do provider e da data. E retorna um objeto Appointment no final */
  // Desestruturamos o objeto que é passado na interface, utilizando o conceito de DTO.
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    /* Salva dentro da appointments variável que está simulando nosso banco */
    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
