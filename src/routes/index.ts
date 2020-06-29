import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

/* Toda rota que utilizar /appointments passará para o controlador de rotas que está em ./appointments.routes, independente se for post, get... */
routes.use('/appointments', appointmentsRouter);

export default routes;
