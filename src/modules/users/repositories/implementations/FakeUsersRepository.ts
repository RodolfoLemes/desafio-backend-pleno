import { v4 as uuidv4 } from 'uuid';
import User from '../../entities/User';
import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { ...data, id: uuidv4() });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[index] = user;

    return user;
  }

  public async findById(userId: string): Promise<User | undefined> {
    return this.users.find(user => user.id === userId);
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}

export default FakeUsersRepository;
