import Movie from '../entities/Movie';
import { dramaMovie } from '../mocks/movies';
import FakeMoviesRepository from '../repositories/implementations/FakeMoviesRepository';
import ListMoviesService from '../services/ListMoviesService';

let moviesRepository: FakeMoviesRepository;
let listMovies: ListMoviesService;
let movie: Movie;

describe('list movies', () => {
  beforeEach(async () => {
    moviesRepository = new FakeMoviesRepository();
    listMovies = new ListMoviesService(moviesRepository);

    movie = await moviesRepository.create(dramaMovie);
  });

  it('should list the movies', async () => {
    const data = await listMovies.execute({
      paginationOptions: {
        limit: 50,
        page: 1,
      },
      sortingOptions: {
        orderBy: 'DESC',
        sortBy: 'created_at',
      },
    });

    expect(data.values[0]).toEqual(movie);
  });
});
