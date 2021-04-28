import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import TypeORMUsersRepository from '@modules/users/repositories/implementations/TypeORMUsersRepository';

import ISignersRepository from '@modules/users/repositories/ISignersRepository';
import TypeORMSignersRepository from '@modules/users/repositories/implementations/TypeORMSignersRepository';

import IManagersRepository from '@modules/users/repositories/IManagersRepository';
import TypeORMManagersRepository from '@modules/users/repositories/implementations/TypeORMManagersRepository';

import IAdminsRepository from '@modules/users/repositories/IAdminsRepository';
import TypeORMAdminsRepository from '@modules/users/repositories/implementations/TypeORMAdminsRepository';

import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import TypeORMMoviesRepository from '@modules/movies/repositories/implementations/TypeORMMoviesRepository';

import ICategoriesRepository from '@modules/movies/repositories/ICategoriesRepository';
import TypeORMCategoriesRepository from '@modules/movies/repositories/implementations/TypeORMCategoriesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  TypeORMUsersRepository,
);

container.registerSingleton<ISignersRepository>(
  'SignersRepository',
  TypeORMSignersRepository,
);

container.registerSingleton<IManagersRepository>(
  'ManagersRepository',
  TypeORMManagersRepository,
);

container.registerSingleton<IAdminsRepository>(
  'AdminsRepository',
  TypeORMAdminsRepository,
);

container.registerSingleton<IMoviesRepository>(
  'MoviesRepository',
  TypeORMMoviesRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  TypeORMCategoriesRepository,
);
