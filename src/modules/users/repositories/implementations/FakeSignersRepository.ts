import { v4 as uuidv4 } from 'uuid';
import Signer from '../../entities/Signer';
import ISignersRepository from '../ISignersRepository';

class FakeSignersRepository implements ISignersRepository {
  private signers: Signer[] = [];

  public async create(userId: string): Promise<Signer> {
    const signer = new Signer();

    Object.assign(signer, { userId, id: uuidv4() });

    this.signers.push(signer);

    return signer;
  }

  public async save(signer: Signer): Promise<Signer> {
    const index = this.signers.findIndex(
      findSigner => findSigner.id === signer.id,
    );

    this.signers[index] = signer;

    return signer;
  }

  public async findById(signerId: string): Promise<Signer | undefined> {
    return this.signers.find(signer => signer.id === signerId);
  }
}

export default FakeSignersRepository;
