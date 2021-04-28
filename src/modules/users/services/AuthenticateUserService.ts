import authConfig from '@config/auth';

import IHashProvider from '@shared/container/providers/HashProvider/IHashProvider';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import User from '../entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError('Wrong username/email or password', 401);
    }

    const testPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!testPassword) {
      throw new AppError('Wrong username/email or password', 401);
    }

    const { secret, expiresIn, refreshExpiresIn } = authConfig.jwt;

    const roles: string[] = [];

    if (user.signer) roles.push('signer');
    if (user.manager) roles.push('manager');
    if (user.admin) roles.push('admin');

    const accessToken = sign({}, secret, {
      subject: JSON.stringify({
        id: user.id,
        username: user.username,
        roles,
      }),
      expiresIn,
    });

    const refreshToken = sign({}, `${secret}@refresh_token`, {
      subject: user.username,
      expiresIn: refreshExpiresIn,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}

export default AuthenticateUserService;
