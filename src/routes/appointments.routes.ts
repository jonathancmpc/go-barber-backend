import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();
const createAppointmentService = new CreateAppointmentService(
  appointmentsRepository,
);

/* A Rota deve estar preocupada apenas com: receber a requisição, chamar outro arquivo para tratar essa requisição e devolver a resposta para o cliente. */

/* Listando os agendamentos */
appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

/* Como temos o método use dentro de index.ts que já nos dá a rota com /appointments, não precisamos utiliza-la aqui nessas rotas, por já cai vir automáticamente, bastando passar o próximo item depois da barra */
appointmentsRouter.post('/', (request, response) => {
  /* Retornando o erro caso já tenha agendamento, o erro foi codificado dentro do service com o throw */
  try {
    /* Pega o prestador de serviço(barbeiro) e a data hora do agendamento */
    const { provider, date } = request.body;

    // A transformação dos dados não é regra de negócio(parse), porém a manipulação da data sim.
    const parsedDate = parseISO(date);

    // Chamando o Service com a regra de negócio e passando o repositório como parãmetro
    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message }); // retorna o erro que está dentro do throw em Service
  }
});

export default appointmentsRouter;
