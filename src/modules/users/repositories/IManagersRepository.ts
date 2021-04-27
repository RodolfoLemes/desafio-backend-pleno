import Manager from '../entities/Manager';

export default interface IManagersRepository {
  create(userId: string): Promise<Manager>;
  save(manager: Manager): Promise<Manager>;
  findById(managerId: string): Promise<Manager | undefined>;
}
