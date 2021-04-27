import { Repository, getRepository } from 'typeorm';
import User from '../../entities/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

class TypeORMUsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      ...data,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findById(userId: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { id: userId } });

    return user;
  }
}

export default TypeORMUsersRepository;
