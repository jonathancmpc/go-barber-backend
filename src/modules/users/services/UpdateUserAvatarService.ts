import path from 'path';
import fs from 'fs'; // fileSystem do Node
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import uploadConfig from '@config/upload';

interface iRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ user_id, avatarFilename }: iRequest): Promise<User> {
    // verificando se o id de usuário é válido
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
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

    await this.usersRepository.save(user); // o método save -> se já existir o usuário ele atualiza, e se não existir ele cria.

    return user;
  }
}

export default UpdateUserAvatarService;
