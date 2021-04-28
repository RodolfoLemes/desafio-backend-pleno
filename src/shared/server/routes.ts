import { Router } from 'express';

import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/users', usersRouter);

export default routes;
