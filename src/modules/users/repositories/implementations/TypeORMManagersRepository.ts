import { Repository, getRepository } from 'typeorm';
import Manager from '../../entities/Manager';
import IManagersRepository from '../IManagersRepository';

class TypeORMManagersRepository implements IManagersRepository {
  private ormRepository: Repository<Manager>;

  constructor() {
    this.ormRepository = getRepository(Manager);
  }

  public async create(userId: string): Promise<Manager> {
    const manager = this.ormRepository.create({
      userId,
    });

    await this.ormRepository.save(manager);

    return manager;
  }

  public async save(manager: Manager): Promise<Manager> {
    return this.ormRepository.save(manager);
  }

  public async findById(managerId: string): Promise<Manager | undefined> {
    const manager = this.ormRepository.findOne({ where: { id: managerId } });

    return manager;
  }
}

export default TypeORMManagersRepository;
