import FakeHashProvider from '@shared/container/providers/HashProvider/implementations/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeSignersRepository from '../repositories/implementations/FakeSignersRepository';
import FakeUsersRepository from '../repositories/implementations/FakeUsersRepository';
import CreateSignerService from '../services/CreateSignerService';

let usersRepository: FakeUsersRepository;
let signersRepository: FakeSignersRepository;
let hashProvider: FakeHashProvider;
let createSigner: CreateSignerService;

describe('create Signer', () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    signersRepository = new FakeSignersRepository();
    hashProvider = new FakeHashProvider();
    createSigner = new CreateSignerService(
      usersRepository,
      signersRepository,
      hashProvider,
    );
  });

  it('should create a signer', async () => {
    const signer = await createSigner.execute({
      username: 'Adalberto',
      password: 'adalberto-password',
    });

    expect(signer.id).toBeTruthy();
    expect(signer.userId).toBeTruthy();
  });

  it('should not create a signer if username already exist', async () => {
    await createSigner.execute({
      username: 'Adalberto',
      password: 'adalberto-password',
    });

    await expect(
      createSigner.execute({
        username: 'Adalberto',
        password: 'adalberto-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
