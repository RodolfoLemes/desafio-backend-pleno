import AppError from '@shared/errors/AppError';
import { addWeeks, subWeeks } from 'date-fns';
import Movie from '../entities/Movie';
import { animationMovie } from '../mocks/movies';
import FakeMoviesRepository from '../repositories/implementations/FakeMoviesRepository';
import ReleaseMovieService from '../services/ReleaseMovieService';

let moviesRepository: FakeMoviesRepository;
let releaseMovie: ReleaseMovieService;
let movie: Movie;

describe('release movie', () => {
  beforeEach(async () => {
    moviesRepository = new FakeMoviesRepository();
    releaseMovie = new ReleaseMovieService(moviesRepository);

    movie = await moviesRepository.create(animationMovie);
  });

  it('should release a movie', async () => {
    await releaseMovie.execute({
      movieId: movie.id,
      endAt: addWeeks(new Date(), 1),
    });

    expect(movie.released).toBeTruthy();
    expect(movie.endAt).toBeTruthy();
  });

  it('should not release a movie if endAt is at the past', async () => {
    await expect(
      releaseMovie.execute({
        movieId: movie.id,
        endAt: subWeeks(new Date(), 1),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not release a movie if movie does not found', async () => {
    await expect(
      releaseMovie.execute({
        movieId: '1234',
        endAt: addWeeks(new Date(), 1),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not release a movie if movie already released', async () => {
    await releaseMovie.execute({
      movieId: movie.id,
      endAt: addWeeks(new Date(), 1),
    });

    await expect(
      releaseMovie.execute({
        movieId: movie.id,
        endAt: addWeeks(new Date(), 1),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
