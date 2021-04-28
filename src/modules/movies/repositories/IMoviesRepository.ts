import Movie from '../entities/Movie';
import ICreateMovieDTO from '../dtos/ICreateMovieDTO';

export default interface IMoviesRepository {
  create(data: ICreateMovieDTO): Promise<Movie>;
  save(movie: Movie): Promise<Movie>;
  findById(movieId: string): Promise<Movie | undefined>;
  findByName(name: string): Promise<Movie | undefined>;
}
