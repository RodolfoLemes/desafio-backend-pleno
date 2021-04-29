import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Movie from '../entities/Movie';
import IMoviesRepository from '../repositories/IMoviesRepository';

interface IRequest {
  movieId: string;
}

@injectable()
export default class ShowMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({ movieId }: IRequest): Promise<Movie> {
    const movie = await this.moviesRepository.findById(movieId);

    if (!movie) throw new AppError("Movie doesn't found", 403);

    return movie;
  }
}
