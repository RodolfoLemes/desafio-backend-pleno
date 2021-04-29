import Movie from '@modules/movies/entities/Movie';
import { animationMovie, dramaMovie } from '@modules/movies/mocks/movies';
import FakeMoviesRepository from '@modules/movies/repositories/implementations/FakeMoviesRepository';
import { subDays } from 'date-fns';
import AutoRemoveMovieService from '../services/AutoRemoveMovieService';

let moviesRepository: FakeMoviesRepository;
let autoRemoveMovie: AutoRemoveMovieService;
let authorizedMovie: Movie;
let notAuthorizedMovie: Movie;

describe('auto remove movie', () => {
  beforeEach(async () => {
    moviesRepository = new FakeMoviesRepository();
    autoRemoveMovie = new AutoRemoveMovieService(moviesRepository);

    authorizedMovie = await moviesRepository.create(dramaMovie);
    authorizedMovie.authorized = true;
    authorizedMovie.endAt = subDays(new Date(), 1);
    await moviesRepository.save(authorizedMovie);
    notAuthorizedMovie = await moviesRepository.create(animationMovie);
  });

  it('should remove the authorized movies', async () => {
    await autoRemoveMovie.execute();

    let foundMovie = await moviesRepository.findById(authorizedMovie.id);
    expect(foundMovie).toBeUndefined();

    foundMovie = await moviesRepository.findById(notAuthorizedMovie.id);
    expect(foundMovie).toBeTruthy();
  });
});
