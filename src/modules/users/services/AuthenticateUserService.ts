import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
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
    const passwordMatched = await compare(password, user.password);

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
