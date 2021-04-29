import AppError from '@shared/errors/AppError';
import Movie from '../entities/Movie';
import { animationMovie } from '../mocks/movies';
import FakeMoviesRepository from '../repositories/implementations/FakeMoviesRepository';
import AuthorizeMovieService from '../services/AuthorizeMovieService';

let moviesRepository: FakeMoviesRepository;
let authorizeMovie: AuthorizeMovieService;
let movie: Movie;

describe('authorize movie', () => {
  beforeEach(async () => {
    moviesRepository = new FakeMoviesRepository();
    authorizeMovie = new AuthorizeMovieService(moviesRepository);

    movie = await moviesRepository.create(animationMovie);
    movie.released = true;
    await moviesRepository.save(movie);
  });

  it('should authorize a movie', async () => {
    await authorizeMovie.execute({
      movieId: movie.id,
    });

    expect(movie.authorized).toBeTruthy();
  });

  it('should not authorize a movie if movie does not found', async () => {
    await expect(
      authorizeMovie.execute({
        movieId: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authorize a movie if was not released', async () => {
    movie.released = false;
    await moviesRepository.save(movie);

    await expect(
      authorizeMovie.execute({
        movieId: movie.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authorize a movie if movie already authorized', async () => {
    await authorizeMovie.execute({
      movieId: movie.id,
    });

    await expect(
      authorizeMovie.execute({
        movieId: movie.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
