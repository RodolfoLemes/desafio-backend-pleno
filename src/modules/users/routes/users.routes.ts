import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import ensureAuthorization from '../middlewares/ensureAuthorization';

const router = Router();
const usersController = new UsersController();

router.post(
  '/signer',
  ensureAuthorization('admin'),
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.createSigner,
);

router.post(
  '/manager',
  ensureAuthorization('admin'),
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.createManager,
);

export default router;
