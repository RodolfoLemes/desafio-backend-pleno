import ensureFiles from '@modules/files/middlewares/ensureFiles';
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

export default router;
