import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123131',
    });

    /* Espera que o appointment contenha um id */
    expect(appointment).toHaveProperty('id');
    /* Espera que o appointment contenha um provider_id */
    expect(appointment.provider_id).toBe('123123131');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 25, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123131',
    });

    // Espera-se que ao tentar inserir um agendamento com o mesmo horário, recebamos um erro.
    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123131',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
