import IHashProvider from '@shared/container/providers/HashProvider/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Manager from '../entities/Manager';
import IManagersRepository from '../repositories/IManagersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
  password: string;
}

@injectable()
export default class CreateManagerService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, password }: IRequest): Promise<Manager> {
    const user = await this.usersRepository.findByUsername(username);

    if (user) throw new AppError('Users with this username already exist', 409);

    const newUser = await this.usersRepository.create({
      username,
      password: await this.hashProvider.generateHash(password),
    });

    const manager = await this.managersRepository.create(newUser.id);

    return manager;
  }
}
