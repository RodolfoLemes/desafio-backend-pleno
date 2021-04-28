import Category from '../entities/Category';

export default interface ICategoriesRepository {
  save(category: Category): Promise<Category>;
  findOrCreate(name: string): Promise<Category>;
  findById(categoryId: string): Promise<Category | undefined>;
}
