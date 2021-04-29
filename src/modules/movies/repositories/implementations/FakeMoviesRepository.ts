import Pagination from '@modules/pagination';
import { v4 as uuidv4 } from 'uuid';
import Movie from '../../entities/Movie';
import IMoviesRepository from '../IMoviesRepository';
import ICreateMovieDTO from '../../dtos/ICreateMovieDTO';

class FakeMoviesRepository implements IMoviesRepository {
  private movies: Movie[] = [];

  public async create(data: ICreateMovieDTO): Promise<Movie> {
    const movie = new Movie();

    Object.assign(movie, { ...data, id: uuidv4(), categories: [] });

    this.movies.push(movie);

    return movie;
  }

  public async save(movie: Movie): Promise<Movie> {
    const index = this.movies.findIndex(findMovie => findMovie.id === movie.id);

    this.movies[index] = movie;

    return movie;
  }

  public async findById(movieId: string): Promise<Movie | undefined> {
    return this.movies.find(movie => movie.id === movieId);
  }

  public async findByName(name: string): Promise<Movie | undefined> {
    return this.movies.find(movie => movie.name === name);
  }

  public async find(): Promise<Pagination<Movie>> {
    return {
      values: this.movies,
      total: this.movies.length,
      totalPages: 1,
    };
  }
}

export default FakeMoviesRepository;
