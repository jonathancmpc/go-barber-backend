import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointments', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123131',
    });

    /* Espera que o appointment contenha um id */
    expect(appointment).toHaveProperty('id');
    /* Espera que o appointment contenha um provider_id */
    expect(appointment.provider_id).toBe('123123131');
  });

  /* it('should not be able to create two appointments on the same time', () => {

  }); */
});
