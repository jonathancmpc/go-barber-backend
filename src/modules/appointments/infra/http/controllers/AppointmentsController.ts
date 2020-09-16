import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  /* Método para criação de um agendamento */
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    /*  */
    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    /* Inserindo informações de agendamento no banco de dados */
    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}
