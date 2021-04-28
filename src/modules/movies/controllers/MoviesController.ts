import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateMovieService from '../services/CreateMovieService';

export default class MoviesController {
  async create(res: Response, req: Request): Promise<Response> {
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
}
