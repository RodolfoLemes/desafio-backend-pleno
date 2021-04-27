import Admin from '../entities/Admin';

export default interface IAdminsRepository {
  create(userId: string): Promise<Admin>;
  save(admin: Admin): Promise<Admin>;
  findById(adminId: string): Promise<Admin | undefined>;
  hasAdmins(): Promise<boolean>;
}
