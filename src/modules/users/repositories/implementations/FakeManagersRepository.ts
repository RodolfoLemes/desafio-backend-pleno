import { v4 as uuidv4 } from 'uuid';
import Manager from '../../entities/Manager';
import IManagersRepository from '../IManagersRepository';

class FakeManagersRepository implements IManagersRepository {
  private managers: Manager[] = [];

  public async create(userId: string): Promise<Manager> {
    const manager = new Manager();

    Object.assign(manager, { userId, id: uuidv4() });

    this.managers.push(manager);

    return manager;
  }

  public async save(manager: Manager): Promise<Manager> {
    const index = this.managers.findIndex(
      findManager => findManager.id === manager.id,
    );

    this.managers[index] = manager;

    return manager;
  }

  public async findById(managerId: string): Promise<Manager | undefined> {
    return this.managers.find(manager => manager.id === managerId);
  }
}

export default FakeManagersRepository;
