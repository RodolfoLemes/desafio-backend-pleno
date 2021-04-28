import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import authenticate from './ensureAuthentication';

export default function ensureAuthorization(
  roles: string[] | string = [],
): (request: Request, response: Response, next: NextFunction) => Promise<void> {
  let rolesList: string[];

  if (typeof roles === 'string') {
    rolesList = [roles];
  } else {
    rolesList = roles;
  }

  return async (request: Request, response: Response, next: NextFunction) => {
    await authenticate(request, response, () => {
      const found = rolesList.some(role => request.user.roles.includes(role));

      if (rolesList.length && !found) {
        throw new AppError('Forbidden', 403);
      }

      next();
    });
  };
}
