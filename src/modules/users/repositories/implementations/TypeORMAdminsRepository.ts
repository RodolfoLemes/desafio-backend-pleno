import { Repository, getRepository } from 'typeorm';
import Admin from '../../entities/Admin';
import IAdminsRepository from '../IAdminsRepository';

class TypeORMAdminsRepository implements IAdminsRepository {
  private ormRepository: Repository<Admin>;

  constructor() {
    this.ormRepository = getRepository(Admin);
  }

  public async create(userId: string): Promise<Admin> {
    const admin = this.ormRepository.create({
      userId,
    });

    await this.ormRepository.save(admin);

    return admin;
  }

  public async save(admin: Admin): Promise<Admin> {
    return this.ormRepository.save(admin);
  }

  public async findById(adminId: string): Promise<Admin | undefined> {
    const admin = await this.ormRepository.findOne({ where: { id: adminId } });

    return admin;
  }

  public async hasAdmins(): Promise<boolean> {
    const admins = await this.ormRepository
      .createQueryBuilder('admin')
      .getCount();

    return !!admins;
  }
}

export default TypeORMAdminsRepository;
