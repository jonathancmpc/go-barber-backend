import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Verifica se existe o email na base de usuários
    const user = await this.usersRepository.findByEmail(email);

    // Se não tiver o email na base, retorna um erro
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // user.password -> acesso a senha criptografada
    // password -> é a senha vindo do request, não criptografada

    // comparando a senha criptografada com a função compare do bcryptjs
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // Usuário Autenticado, gerando token
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
