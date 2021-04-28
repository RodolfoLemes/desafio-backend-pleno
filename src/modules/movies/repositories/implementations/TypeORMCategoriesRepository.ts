import { Repository, getRepository } from 'typeorm';
import Category from '../../entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';

class TypeORMCategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findOrCreate(name: string): Promise<Category> {
    let category = await this.ormRepository.findOne({ where: { name } });

    if (!category) {
      category = this.ormRepository.create({
        name,
      });

      await this.ormRepository.save(category);
    }

    return category;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }

  public async findById(categoryId: string): Promise<Category | undefined> {
    const category = this.ormRepository.findOne({ where: { id: categoryId } });

    return category;
  }
}

export default TypeORMCategoriesRepository;
