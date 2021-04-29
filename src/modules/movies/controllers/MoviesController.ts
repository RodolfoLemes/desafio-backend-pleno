import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateMovieService from '../services/CreateMovieService';
import ListMoviesService from '../services/ListMoviesService';

export default class MoviesController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, synopsis, categories } = req.body;
    const cover = req.file.filename;

    const createMovie = container.resolve(CreateMovieService);
    const movie = await createMovie.execute({
      name,
      synopsis,
      categories,
      cover,
    });

    return res.status(201).json(classToClass(movie));
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { released, authorized, category, name } = req.query;
    const { paginationOptions } = req;
    const { sortingOptions } = req;

    const releasedParam = released ? released === 'true' : undefined;
    const authorizedParam = authorized ? authorized === 'true' : undefined;
    const categoryParam = category ? (category as string) : undefined;
    const nameParam = name ? (name as string) : undefined;

    const listMovies = container.resolve(ListMoviesService);
    const data = await listMovies.execute({
      released: releasedParam,
      authorized: authorizedParam,
      category: categoryParam,
      name: nameParam,
      paginationOptions,
      sortingOptions,
    });

    return res.json(classToClass(data));
  }
}
