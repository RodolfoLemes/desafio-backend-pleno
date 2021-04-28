import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import { Request, Response, NextFunction } from 'express';
import multer, { Field, MulterError } from 'multer';

const upload = multer(uploadConfig.multer);

export default function ensureFiles(
  filenames: string[] | string,
  required = true,
): (request: Request, response: Response, next: NextFunction) => Promise<void> {
  return async (request: Request, response: Response, next: NextFunction) => {
    function handleErrors(err?: unknown): void {
      if (err instanceof MulterError) {
        return next(new AppError(err.message, 406));
      }
      if (err instanceof Error) {
        return next(new AppError(err.message, 406));
      }
      if (typeof filenames === 'string' && !request.file && required) {
        return next(new AppError("File doesn't provided", 406));
      }
      if (
        typeof filenames === 'object' &&
        Object.keys(request.files).length !== filenames.length &&
        required
      ) {
        return next(new AppError("Files doesn't provided", 406));
      }
      return next();
    }

    if (typeof filenames === 'string') {
      upload.single(filenames)(request, response, handleErrors);
    } else {
      const fields: Field[] = filenames.map(fieldname => ({
        name: fieldname,
        maxCount: 1,
      }));
      upload.fields(fields)(request, response, handleErrors);
    }
  };
}
