import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UsersAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
// importando o multer que é um Middleware, junto com nosso arquivo de configuração.
const upload = multer(uploadConfig);
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

usersRouter.post('/', usersController.create);

// Utilizamos o Middleware que verifica se o usuário foi autenticado, e o Middleware do Multer para informar que iremos importar um arquivo por vez(single) nesta rota.
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
