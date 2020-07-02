import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do Token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Bearer fkldajfklsaj -> Temos que dividir o Bearer do token
  // Podemos fazer a desestruturação das variáveis que retornam do split, mas como não queremos usar o tipo/type(Bearer), passamos em branco a primeira variável
  const [, token] = authHeader.split(' ');

  // Verificando se o token está correto e se bate com nossa chave.
  // Buscando o secret em config.
  const { secret } = authConfig.jwt;

  // Verificando e tratando o erro
  try {
    const decoded = verify(token, secret);

    // Extraindo o id do token(sub) e forçando os tipos da variável decoded, pois ela não sabe quais são os tipos retornados
    const { sub } = decoded as TokenPayload;

    // Enviando o usuário autenticado pelo request para ser recuperado em todas as sessões e rotas, porém o tipo/variável user não existe dentro do request, então teremos que sobreescrever os tipos do request, por isso criamos uma pasta chamada @types
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
