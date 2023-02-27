import { EqType } from "../../Shared/Domain/EqType";
import { CategoryEntity, PartialCategoryEntity } from "./CategoryEntity";

export interface ICategoryRepository {
  createCategory(category: CategoryEntity): Promise<Boolean>;
  updateCategory(category: PartialCategoryEntity): Promise<Boolean>;
  getCategory(uuid: string): Promise<CategoryEntity>;
  getCategoriesBy(
    categoryParams: EqType<PartialCategoryEntity>
  ): Promise<CategoryEntity[]>;
  disableCategory(uuid: string): Promise<Boolean>;
}
