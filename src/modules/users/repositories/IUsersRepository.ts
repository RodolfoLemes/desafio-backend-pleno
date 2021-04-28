import User from '../entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findById(userId: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
}
