import Pagination from '@modules/pagination';
import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import ISortingOptions from '@modules/sorting/interfaces/ISortingOptions';
import { inject, injectable } from 'tsyringe';
import IMoviesRepository from '../repositories/IMoviesRepository';
import Movie from '../entities/Movie';

interface IRequest {
  released?: boolean;
  authorized?: boolean;
  name?: string;
  category?: string;
  paginationOptions: IPaginationOptions;
  sortingOptions: ISortingOptions;
}

@injectable()
export default class ListMoviesService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({
    released,
    authorized,
    name,
    category,
    paginationOptions,
    sortingOptions,
  }: IRequest): Promise<Pagination<Movie>> {
    const data = await this.moviesRepository.find(
      {
        released,
        authorized,
        name,
        category,
      },
      paginationOptions,
      sortingOptions,
    );

    return data;
  }
}
