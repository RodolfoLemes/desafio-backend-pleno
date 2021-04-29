import { Repository, getRepository } from 'typeorm';
import IFindMovieDTO from '@modules/movies/dtos/IFindMovieDTO';
import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import ISortingOptions from '@modules/sorting/interfaces/ISortingOptions';
import Pagination from '@modules/pagination';
import AppError from '@shared/errors/AppError';
import Movie from '../../entities/Movie';
import ICreateMovieDTO from '../../dtos/ICreateMovieDTO';
import IMoviesRepository from '../IMoviesRepository';

class TypeORMMoviesRepository implements IMoviesRepository {
  private ormRepository: Repository<Movie>;

  constructor() {
    this.ormRepository = getRepository(Movie);
  }

  public async create(data: ICreateMovieDTO): Promise<Movie> {
    const movie = this.ormRepository.create({
      ...data,
      categories: [],
    });

    await this.ormRepository.save(movie);

    return movie;
  }

  public async save(movie: Movie): Promise<Movie> {
    return this.ormRepository.save(movie);
  }

  public async findById(movieId: string): Promise<Movie | undefined> {
    const movie = this.ormRepository.findOne({ where: { id: movieId } });

    return movie;
  }

  public async findByName(name: string): Promise<Movie | undefined> {
    const movie = this.ormRepository.findOne({ where: { name } });

    return movie;
  }

  public async find(
    { released, authorized, category: categoryName, name }: IFindMovieDTO,
    { limit, page }: IPaginationOptions,
    { orderBy, sortBy }: ISortingOptions,
  ): Promise<Pagination<Movie>> {
    let query = this.ormRepository
      .createQueryBuilder('movie')
      .innerJoin('movie.categories', 'categories')
      .limit(limit)
      .offset((page - 1) * limit);

    if (released !== undefined)
      query = query.andWhere('movie.released = :released', { released });

    if (authorized !== undefined)
      query = query.andWhere('movie.authorized = :authorized', { authorized });

    if (name) query = query.andWhere('movie.name = :name', { name });

    if (categoryName)
      query = query.andWhere('lower(categories.name) = lower(:categoryName)', {
        categoryName,
      });

    try {
      const [data, total] = await query
        .addOrderBy(`movie.${sortBy}`, orderBy)
        .getManyAndCount();

      return {
        values: data,
        total,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new AppError('Invalid column to sort by', 409);
    }
  }
}

export default TypeORMMoviesRepository;
