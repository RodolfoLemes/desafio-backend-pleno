import Signer from '../entities/Signer';

export default interface ISignersRepository {
  create(userId: string): Promise<Signer>;
  save(signer: Signer): Promise<Signer>;
  findById(signerId: string): Promise<Signer | undefined>;
}
