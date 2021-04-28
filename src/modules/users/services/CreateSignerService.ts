import IHashProvider from '@shared/container/providers/HashProvider/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Signer from '../entities/Signer';
import ISignersRepository from '../repositories/ISignersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
  password: string;
}

@injectable()
export default class CreateSignerService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SignersRepository')
    private signersRepository: ISignersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, password }: IRequest): Promise<Signer> {
    const user = await this.usersRepository.findByUsername(username);

    if (user) throw new AppError('Users with this username already exist', 409);

    const newUser = await this.usersRepository.create({
      username,
      password: await this.hashProvider.generateHash(password),
    });

    const signer = await this.signersRepository.create(newUser.id);

    return signer;
  }
}
