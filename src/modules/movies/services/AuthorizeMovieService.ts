import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMoviesRepository from '../repositories/IMoviesRepository';

interface IRequest {
  movieId: string;
}

@injectable()
export default class AuthorizeMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({ movieId }: IRequest): Promise<void> {
    const movie = await this.moviesRepository.findById(movieId);

    if (!movie) throw new AppError('Movie not found', 403);

    if (!movie.released) throw new AppError('Movie needs to be released');

    if (movie.authorized) throw new AppError('Movie already authorized');

    movie.authorized = true;
    await this.moviesRepository.save(movie);
  }
}
