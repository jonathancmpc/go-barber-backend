import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    // Cria o usuário primeiro antes de autenticar
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    // Autentica o usuário criado anteriormente
    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    /* Espera que o usuário contenha um token para autenticação, e que retorne também o usuário autenticado */
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});
