import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/container';
import '@shared/database';
import '@modules/tasks';

const app = express();

// CORS Middleware
app.use(cors());

// JSON Middleware
app.use(express.json());

// Static files Middleware
app.use('/files', express.static(uploadConfig.uploadsFolder));

// Routes Middleware
app.use(routes);

// Celebrate Errors Middleware
app.use(errors());

// Global Exception Handler Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
