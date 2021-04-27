import { v4 as uuidv4 } from 'uuid';
import Admin from '../../entities/Admin';
import IAdminsRepository from '../IAdminsRepository';

class FakeAdminsRepository implements IAdminsRepository {
  private admins: Admin[] = [];

  public async create(userId: string): Promise<Admin> {
    const admin = new Admin();

    Object.assign(admin, { userId, id: uuidv4() });

    this.admins.push(admin);

    return admin;
  }

  public async save(admin: Admin): Promise<Admin> {
    const index = this.admins.findIndex(findAdmin => findAdmin.id === admin.id);

    this.admins[index] = admin;

    return admin;
  }

  public async findById(adminId: string): Promise<Admin | undefined> {
    return this.admins.find(admin => admin.id === adminId);
  }

  public async hasAdmins(): Promise<boolean> {
    return !!this.admins.length;
  }
}

export default FakeAdminsRepository;
