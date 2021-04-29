import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class AutoRemoveMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute(): Promise<void> {
    const movies = await this.moviesRepository.findAllByAuthorized();

    await Promise.all(
      movies.map(async movie => this.moviesRepository.remove(movie)),
    );
  }
}
