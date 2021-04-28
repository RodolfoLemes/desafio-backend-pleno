import { Repository, getRepository } from 'typeorm';
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
}

export default TypeORMMoviesRepository;
