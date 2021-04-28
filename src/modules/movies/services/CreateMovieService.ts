import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Movie from '../entities/Movie';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import IMoviesRepository from '../repositories/IMoviesRepository';

interface IRequest {
  name: string;
  synopsis: string;
  cover: string;
  categories: string[];
}

@injectable()
export default class CreateMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    synopsis,
    cover,
    categories: categoryNames,
  }: IRequest): Promise<Movie> {
    const movie = await this.moviesRepository.findByName(name);

    if (movie) throw new AppError('Movie with this name already exist', 409);

    const file = await this.storageProvider.saveFile(cover);

    const newMovie = await this.moviesRepository.create({
      name,
      synopsis,
      cover: file,
    });

    const categories = await Promise.all(
      categoryNames.map(mappedCategoryNames =>
        this.categoriesRepository.findOrCreate(mappedCategoryNames),
      ),
    );

    newMovie.categories.push(...categories);
    await this.moviesRepository.save(newMovie);

    return newMovie;
  }
}
