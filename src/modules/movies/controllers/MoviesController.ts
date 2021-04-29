import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthorizeMovieService from '../services/AuthorizeMovieService';
import CreateMovieService from '../services/CreateMovieService';
import ListMoviesService from '../services/ListMoviesService';
import ReleaseMovieService from '../services/ReleaseMovieService';
import ShowMovieService from '../services/ShowMovieService';

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

  async show(req: Request, res: Response): Promise<Response> {
    const { movie_id: movieId } = req.params;

    const showMovie = container.resolve(ShowMovieService);
    const movie = await showMovie.execute({ movieId });

    return res.json(classToClass(movie));
  }

  async release(req: Request, res: Response): Promise<Response> {
    const { end_at: endAt } = req.body;
    const { movie_id: movieId } = req.params;

    const releaseMovie = container.resolve(ReleaseMovieService);
    await releaseMovie.execute({ movieId, endAt });

    return res.status(204).send();
  }

  async authorize(req: Request, res: Response): Promise<Response> {
    const { movie_id: movieId } = req.params;

    const authorizeMovie = container.resolve(AuthorizeMovieService);
    await authorizeMovie.execute({ movieId });

    return res.status(204).send();
  }
}
