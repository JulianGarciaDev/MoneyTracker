import {
  CategoryEntity,
  PartialCategoryEntity,
} from "../Domain/CategoryEntity";
import {
  CategoryNameDuplicatedError,
  CategoryNotFoundError,
} from "../Domain/CategoryErrors";
import { ICategoryRepository } from "../Domain/ICategoryRepository";
import { CategoryExists } from "./CategoryExists";
import { GetCategory } from "./GetCategory";

export class UpdateCategory {
  private categoryExists: CategoryExists;

  constructor(private readonly categoryRepository: ICategoryRepository) {
    this.categoryExists = new CategoryExists(categoryRepository);
  }

  async nameUnique(
    categoryEntity: PartialCategoryEntity,
    categoryUuid: string
  ): Promise<CategoryEntity> {
    categoryEntity = this.normalizeEntity(categoryEntity);
    await this.checkParams(categoryEntity, categoryUuid);
    categoryEntity.uuid = categoryUuid;
    await this.categoryRepository.updateCategory(categoryEntity);
    return await new GetCategory(this.categoryRepository).byUuid(categoryUuid);
  }

  private normalizeEntity(
    categoryEntity: PartialCategoryEntity
  ): PartialCategoryEntity {
    if ("name" in categoryEntity) {
      categoryEntity.name = String(categoryEntity.name);
    }
    return categoryEntity;
  }

  private async checkParams(
    partialEntity: PartialCategoryEntity,
    uuid: string
  ): Promise<void> {
    await this.checkUuidExists(uuid);
    await this.checkNameNotInOtherUuid(partialEntity, uuid);
  }

  private async checkUuidExists(categoryUuid: string): Promise<void> {
    const exists = await this.categoryExists.byUuid(categoryUuid);
    if (!exists) throw new CategoryNotFoundError();
  }

  private async checkNameNotInOtherUuid(
    categoryEntity: PartialCategoryEntity,
    categoryUuid: string
  ): Promise<void> {
    if ("name" in categoryEntity && categoryEntity.name) {
      const exists = await this.categoryExists.byNameInOtherUuid(
        categoryEntity.name,
        categoryUuid
      );
      if (exists) throw new CategoryNameDuplicatedError();
    }
  }
}
