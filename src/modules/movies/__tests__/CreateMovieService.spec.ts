import FakeStorageProvider from '@shared/container/providers/StorageProvider/implementations/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import { animationMovie, dramaMovie } from '../mocks/movies';
import FakeCategoriesRepository from '../repositories/implementations/FakeCategoriesRepository';
import FakeMoviesRepository from '../repositories/implementations/FakeMoviesRepository';
import CreateMovieService from '../services/CreateMovieService';

let moviesRepository: FakeMoviesRepository;
let categoriesRepository: FakeCategoriesRepository;
let storageProvider: FakeStorageProvider;
let createMovie: CreateMovieService;

describe('create movie', () => {
  beforeEach(async () => {
    moviesRepository = new FakeMoviesRepository();
    categoriesRepository = new FakeCategoriesRepository();
    storageProvider = new FakeStorageProvider();
    createMovie = new CreateMovieService(
      moviesRepository,
      categoriesRepository,
      storageProvider,
    );
  });

  it('should create a movie', async () => {
    const movie = await createMovie.execute(dramaMovie);

    expect(movie.id).toBeTruthy();

    const anotherMovie = await createMovie.execute(animationMovie);

    expect(anotherMovie.id).toBeTruthy();
  });

  it('should not create a movie if the movie already exist', async () => {
    await createMovie.execute(dramaMovie);

    await expect(createMovie.execute(dramaMovie)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
