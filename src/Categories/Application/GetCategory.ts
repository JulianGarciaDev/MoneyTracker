import { CategoryEntity } from "../Domain/CategoryEntity";
import { ICategoryRepository } from "../Domain/ICategoryRepository";
import { GetManyCategories } from "./GetManyCategories";

export class GetCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async byUuid(uuid: string): Promise<CategoryEntity> {
    return await this.categoryRepository.getCategory(uuid);
  }

  async withChildren(uuid: string): Promise<CategoryEntity> {
    let category = await this.byUuid(uuid);
    const getManyCategories = new GetManyCategories(this.categoryRepository);
    category.children = await getManyCategories.byParentUuid(uuid);
    return category;
  }
}
