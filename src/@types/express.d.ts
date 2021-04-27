import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        username: string;
        roles: string[];
      };
      paginationOptions: IPaginationOptions;
    }
  }
}
