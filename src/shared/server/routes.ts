import { Router } from 'express';

import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import moviesRouter from '@modules/movies/routes/movies.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/users', usersRouter);

routes.use('/movies', moviesRouter);

export default routes;
