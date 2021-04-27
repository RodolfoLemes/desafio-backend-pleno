import IHashProvider from '@shared/container/providers/HashProvider/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Admin from '../entities/Admin';
import IAdminsRepository from '../repositories/IAdminsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateFirstAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(): Promise<Admin | undefined> {
    const checkAdminExists = await this.adminsRepository.hasAdmins();

    const password = process.env.ADMIN_PASSWORD;

    if (!checkAdminExists) {
      if (!password) {
        throw new AppError(
          'Environment variables ADMIN_EMAIL and ADMIN_PASSWORD are required',
        );
      }

      const user = await this.usersRepository.create({
        password: await this.hashProvider.generateHash(password),
        username: 'admin',
      });

      const admin = this.adminsRepository.create(user.id);

      return admin;
    }
    return undefined;
  }
}

export default CreateFirstAdminService;
