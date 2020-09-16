import { Router } from 'express';

/* Importando middleware de autenticação e Controller de Agendamentos */
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

/* Instanciando as Rotas do Express e o controller de agendamentos */
const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// Aplicando o Middleware de autenticação em todas as rotas de agendamentos
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
