import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: multer.Options;

  image: {
    height: number;
    width: number;
  };

  uploadLimits: {
    photo: number;
    video: number;
  };

  config: {
    disk: unknown;
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  image: {
    width: Number(process.env.MAX_IMAGE_SIZE || '1024'),
    height: Number(process.env.MAX_IMAGE_SIZE || '1024'),
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET || '',
    },
  },
} as IUploadConfig;
