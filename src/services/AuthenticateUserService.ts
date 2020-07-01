import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    // Verifica se existe o email na base de usuários
    const user = await usersRepository.findOne({ where: { email } });

    // Se não tiver o email na base, retorna um erro
    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    // user.password -> acesso a senha criptografada
    // password -> é a senha vindo do request, não criptografada

    // comparando a senha criptografada com a função compare do bcryptjs
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
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
