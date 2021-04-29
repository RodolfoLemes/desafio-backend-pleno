import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import ISortingOptions from '@modules/sorting/interfaces/ISortingOptions';
import Pagination from '@modules/pagination';
import Movie from '../entities/Movie';
import ICreateMovieDTO from '../dtos/ICreateMovieDTO';
import IFindMovieDTO from '../dtos/IFindMovieDTO';

export default interface IMoviesRepository {
  create(data: ICreateMovieDTO): Promise<Movie>;
  save(movie: Movie): Promise<Movie>;
  findById(movieId: string): Promise<Movie | undefined>;
  findByName(name: string): Promise<Movie | undefined>;
  find(
    data: IFindMovieDTO,
    paginationOptions: IPaginationOptions,
    sortingOptions: ISortingOptions,
  ): Promise<Pagination<Movie>>;
}
