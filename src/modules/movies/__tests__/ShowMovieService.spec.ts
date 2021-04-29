import AppError from '@shared/errors/AppError';
import Movie from '../entities/Movie';
import { animationMovie } from '../mocks/movies';
import FakeMoviesRepository from '../repositories/implementations/FakeMoviesRepository';
import ShowMovieService from '../services/ShowMovieService';

let moviesRepository: FakeMoviesRepository;
let showMovie: ShowMovieService;
let movie: Movie;

describe('release movie', () => {
  beforeEach(async () => {
    moviesRepository = new FakeMoviesRepository();
    showMovie = new ShowMovieService(moviesRepository);

    movie = await moviesRepository.create(animationMovie);
  });

  it('should release a movie', async () => {
    await showMovie.execute({
      movieId: movie.id,
    });

    expect(movie.id).toBeTruthy();
  });

  it('should not release a movie if movie does not found', async () => {
    await expect(
      showMovie.execute({
        movieId: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
