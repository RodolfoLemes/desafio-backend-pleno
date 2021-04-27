import { Repository, getRepository } from 'typeorm';
import Signer from '../../entities/Signer';
import ISignersRepository from '../ISignersRepository';

class TypeORMSignersRepository implements ISignersRepository {
  private ormRepository: Repository<Signer>;

  constructor() {
    this.ormRepository = getRepository(Signer);
  }

  public async create(userId: string): Promise<Signer> {
    const signer = this.ormRepository.create({
      userId,
    });

    await this.ormRepository.save(signer);

    return signer;
  }

  public async save(signer: Signer): Promise<Signer> {
    return this.ormRepository.save(signer);
  }

  public async findById(signerId: string): Promise<Signer | undefined> {
    const signer = this.ormRepository.findOne({ where: { id: signerId } });

    return signer;
  }
}

export default TypeORMSignersRepository;
