import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs'; // fileSystem do Node

import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // verificando se o id de usuário é válido
    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar.');
    }

    // verifica se o usuário já tem um avatar para deletar o arquivo antigo
    if (user.avatar) {
      // fazendo o join entre dois caminhos
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Verificando se existe o avatar, o stat do fileSystem retorna o status do path somente se ele existir, então com isso podemos verificar se ele existe ou não.
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // Atualizando o usuário
    user.avatar = avatarFilename;

    await usersRepository.save(user); // o método save -> se já existir o usuário ele atualiza, e se não existir ele cria.

    return user;
  }
}

export default UpdateUserAvatarService;
