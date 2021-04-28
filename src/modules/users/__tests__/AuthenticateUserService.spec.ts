import FakeHashProvider from '@shared/container/providers/HashProvider/implementations/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import Admin from '../entities/Admin';
import Manager from '../entities/Manager';
import Signer from '../entities/Signer';
import User from '../entities/User';
import normalUser from '../mocks/users';
import FakeUsersRepository from '../repositories/implementations/FakeUsersRepository';
import AuthenticateUserService from '../services/AuthenticateUserService';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let user: User;

describe('AuthenticateUser', () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );
    user = await usersRepository.create(normalUser);
  });

  it('should authenticate user with username and password', async () => {
    let response = await authenticateUser.execute({
      username: normalUser.username,
      password: normalUser.password,
    });
    expect(response).toHaveProperty('accessToken');
    expect(response.user).toEqual(user);

    user.signer = new Signer();
    response = await authenticateUser.execute({
      username: normalUser.username,
      password: normalUser.password,
    });
    expect(response.user.signer).toBeTruthy();

    user.manager = new Manager();
    response = await authenticateUser.execute({
      username: normalUser.username,
      password: normalUser.password,
    });
    expect(response.user.manager).toBeTruthy();

    user.admin = new Admin();
    response = await authenticateUser.execute({
      username: normalUser.username,
      password: normalUser.password,
    });
    expect(response.user.admin).toBeTruthy();
  });

  it('should not authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        username: 'Agente João',
        password: normalUser.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate with wrong password', async () => {
    await expect(
      authenticateUser.execute({
        username: normalUser.username,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
