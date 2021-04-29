import ensureFiles from '@modules/files/middlewares/ensureFiles';
import pagination from '@modules/pagination/middlewares/pagination';
import sorting from '@modules/sorting/middlewares/sorting';
import ensureAuthorization from '@modules/users/middlewares/ensureAuthorization';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import MoviesController from '../controllers/MoviesController';

const router = Router();
const moviesController = new MoviesController();

router.post(
  '/',
  ensureAuthorization('signer'),
  ensureFiles('cover'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      synopsis: Joi.string().max(500).required(),
      categories: Joi.array().items(Joi.string()),
    },
  }),
  moviesController.create,
);

router.get(
  '/',
  ensureAuthorization(['manager', 'admin']),
  pagination,
  sorting,
  celebrate({
    [Segments.QUERY]: {
      released: Joi.string().valid('true', 'false'),
      authorized: Joi.string().valid('true', 'false'),
      name: Joi.string(),
      category: Joi.string(),
      limit: Joi.number(),
      page: Joi.number(),
      order_by: Joi.string().valid('ASC', 'DESC'),
      sort_by: Joi.string(),
    },
  }),
  moviesController.list,
);

export default router;
