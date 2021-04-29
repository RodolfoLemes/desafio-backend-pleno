import { Request, Response, NextFunction } from 'express';
import { snakeCase } from 'snake-case';

export default function sorting(
  request: Request,
  _response: Response,
  next: NextFunction,
): void {
  const { order_by: orderBy, sort_by: sortBy } = request.query;

  const orderByField = orderBy ? (orderBy as 'ASC' | 'DESC') : 'DESC';
  const sortByField = sortBy ? snakeCase(sortBy as string) : 'created_at';

  request.sortingOptions = {
    orderBy: orderByField,
    sortBy: sortByField,
  };

  return next();
}
