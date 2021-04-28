import FakeHashProvider from '@shared/container/providers/HashProvider/implementations/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeManagersRepository from '../repositories/implementations/FakeManagersRepository';
import FakeUsersRepository from '../repositories/implementations/FakeUsersRepository';
import CreateManagerService from '../services/CreateManagerService';

let usersRepository: FakeUsersRepository;
let managersRepository: FakeManagersRepository;
let hashProvider: FakeHashProvider;
let createManager: CreateManagerService;

describe('create manager', () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    managersRepository = new FakeManagersRepository();
    hashProvider = new FakeHashProvider();
    createManager = new CreateManagerService(
      usersRepository,
      managersRepository,
      hashProvider,
    );
  });

  it('should create a manager', async () => {
    const manager = await createManager.execute({
      username: 'Adalberto',
      password: 'adalberto-password',
    });

    expect(manager.id).toBeTruthy();
    expect(manager.userId).toBeTruthy();
  });

  it('should not create a manager if username already exist', async () => {
    await createManager.execute({
      username: 'Adalberto',
      password: 'adalberto-password',
    });

    await expect(
      createManager.execute({
        username: 'Adalberto',
        password: 'adalberto-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
