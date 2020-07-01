import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

/* Toda rota que utilizar /appointments passará para o controlador de rotas que está em ./appointments.routes, independente se for post, get... */
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
