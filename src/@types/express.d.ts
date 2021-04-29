import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import ISortingOptions from '@modules/sorting/interfaces/ISortingOptions';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        username: string;
        roles: string[];
      };
      paginationOptions: IPaginationOptions;
      sortingOptions: ISortingOptions;
    }
  }
}
