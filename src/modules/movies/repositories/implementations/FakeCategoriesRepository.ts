import { v4 as uuidv4 } from 'uuid';
import Category from '../../entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findOrCreate(name: string): Promise<Category> {
    let category = this.categories.find(
      foundCategory => foundCategory.name === name,
    );

    if (!category) {
      category = new Category();

      Object.assign(category, { name, id: uuidv4() });

      this.categories.push(category);
    }

    return category;
  }

  public async save(category: Category): Promise<Category> {
    const index = this.categories.findIndex(
      findCategory => findCategory.id === category.id,
    );

    this.categories[index] = category;

    return category;
  }

  public async findById(categoryId: string): Promise<Category | undefined> {
    return this.categories.find(category => category.id === categoryId);
  }
}

export default FakeCategoriesRepository;
