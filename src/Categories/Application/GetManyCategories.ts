import { EqType } from "../../Shared/Domain/EqType";
import {
  CategoryEntity,
  PartialCategoryEntity,
} from "../Domain/CategoryEntity";
import { ICategoryRepository } from "../Domain/ICategoryRepository";

export class GetManyCategories {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async byParentUuid(parentUuid: string): Promise<CategoryEntity[]> {
    const params = {
      eq: { parentUuid: parentUuid },
    } as EqType<PartialCategoryEntity>;
    return await this.categoryRepository.getCategoriesBy(params);
  }

  async main(): Promise<CategoryEntity[]> {
    return await this.byParentUuid("");
  }
}
