import path from 'path';
import fs from 'fs'; // fileSystem do Node
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import uploadConfig from '@config/upload';

interface iRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
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
      await this.storageProvider.deleteFile(user.avatar);
    }

    // Salvando o arquivo em uploads, retirando de tmp
    const filename = await this.storageProvider.saveFile(avatarFilename);

    // Atualizando o usuário
    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
