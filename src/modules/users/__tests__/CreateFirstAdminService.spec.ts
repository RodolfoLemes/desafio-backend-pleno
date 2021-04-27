import FakeHashProvider from '@shared/container/providers/HashProvider/implementations/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeAdminsRepository from '../repositories/implementations/FakeAdminsRepository';
import FakeUsersRepository from '../repositories/implementations/FakeUsersRepository';
import CreateFirstAdminService from '../services/CreateFirstAdminService';

let usersRepository: FakeUsersRepository;
let adminsRepository: FakeAdminsRepository;
let hashProvider: FakeHashProvider;
let createFirstAdmin: CreateFirstAdminService;

describe('CreateFirstAdmin', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    adminsRepository = new FakeAdminsRepository();
    hashProvider = new FakeHashProvider();
    createFirstAdmin = new CreateFirstAdminService(
      adminsRepository,
      usersRepository,
      hashProvider,
    );
    process.env.ADMIN_USERNAME = 'admin@email.com';
    process.env.ADMIN_PASSWORD = '123456';
  });

  it('should create an Admin User', async () => {
    const user = await createFirstAdmin.execute();

    expect(user).toHaveProperty('id');
  });

  it('should not create an Admin User without env vars', async () => {
    process.env.ADMIN_USERNAME = '';
    process.env.ADMIN_PASSWORD = '';

    await expect(createFirstAdmin.execute()).rejects.toBeInstanceOf(AppError);
  });

  it('should not create an Admin User if another admin already exists', async () => {
    await createFirstAdmin.execute();

    const otherAdmin = await createFirstAdmin.execute();

    expect(otherAdmin).toBeUndefined();
  });
});
