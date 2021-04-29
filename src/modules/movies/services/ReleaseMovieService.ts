import AppError from '@shared/errors/AppError';
import { isPast } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IMoviesRepository from '../repositories/IMoviesRepository';

interface IRequest {
  movieId: string;
  endAt: Date;
}

@injectable()
export default class ReleaseMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({ movieId, endAt }: IRequest): Promise<void> {
    if (isPast(endAt)) throw new AppError('End at needs to be at the future');

    const movie = await this.moviesRepository.findById(movieId);

    if (!movie) throw new AppError('Movie not found', 403);

    if (movie.released) throw new AppError('Movie already released');

    movie.released = true;
    movie.endAt = endAt;
    await this.moviesRepository.save(movie);
  }
}
