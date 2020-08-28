import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

/* import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'; */

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository', // Poderia ser qualquer nome
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository', // Poderia ser qualquer nome
  UsersRepository,
);
