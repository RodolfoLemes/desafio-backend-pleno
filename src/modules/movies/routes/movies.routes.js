import ensureFiles from '@modules/files/middlewares/ensureFiles';
import pagination from '@modules/pagination/middlewares/pagination';
import sorting from '@modules/sorting/middlewares/sorting';
import ensureAuthentication from '@modules/users/middlewares/ensureAuthentication';
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

router.get(
  '/:movie_id',
  ensureAuthentication,
  celebrate({
    [Segments.PARAMS]: {
      movie_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  moviesController.show,
);

router.patch(
  '/:movie_id/release',
  ensureAuthorization('manager'),
  celebrate({
    [Segments.BODY]: {
      end_at: Joi.date().required(),
    },
    [Segments.PARAMS]: {
      movie_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  moviesController.release,
);

router.patch(
  '/:movie_id/authorize',
  ensureAuthorization('admin'),
  celebrate({
    [Segments.PARAMS]: {
      movie_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  moviesController.authorize,
);

export default router;
