import { v4 as uuidv4 } from "uuid";

import {
  CategoryEntity,
  PartialCategoryEntity,
} from "../Domain/CategoryEntity";
import { ICategoryRepository } from "../Domain/ICategoryRepository";
import {
  CategoryNameDuplicatedError,
  CategoryNameRequiredError,
  ParentCategoryNotFoundError,
} from "../Domain/CategoryErrors";
import { CategoryExists } from "./CategoryExists";
import { GetCategory } from "./GetCategory";

export class CreateCategory {
  protected categoryExists: CategoryExists;

  constructor(private readonly categoryRepository: ICategoryRepository) {
    this.categoryExists = new CategoryExists(this.categoryRepository);
  }

  async visible(partialEntity: PartialCategoryEntity): Promise<CategoryEntity> {
    partialEntity = await this.checkParams(partialEntity);
    const newUuid = uuidv4();
    partialEntity.uuid = newUuid;
    partialEntity.visible = true;
    partialEntity.enable = true;
    const entity = partialEntity as CategoryEntity;
    await this.categoryRepository.createCategory(entity);
    return await new GetCategory(this.categoryRepository).byUuid(newUuid);
  }

  private async checkParams(
    partialEntity: PartialCategoryEntity
  ): Promise<PartialCategoryEntity> {
    await this.checkName(partialEntity.name);
    partialEntity = await this.checkParentCategory(partialEntity);
    partialEntity = this.checkIconCategory(partialEntity);
    return partialEntity;
  }

  private async checkName(name: string | undefined): Promise<void> {
    if (!name) throw new CategoryNameRequiredError();
    const duplicated = await this.categoryExists.byName(name);
    if (duplicated) throw new CategoryNameDuplicatedError();
  }

  private async checkParentCategory(
    partialEntity: PartialCategoryEntity
  ): Promise<PartialCategoryEntity> {
    if (partialEntity.parentUuid) {
      const exists = await this.categoryExists.byUuid(partialEntity.parentUuid);
      if (!exists) throw new ParentCategoryNotFoundError();
    } else {
      partialEntity.parentUuid = "";
    }
    return partialEntity;
  }

  private checkIconCategory(
    partialEntity: PartialCategoryEntity
  ): PartialCategoryEntity {
    partialEntity.icon =
      partialEntity.icon ||
      partialEntity.name?.substring(0, 2).toUpperCase() ||
      "XX";
    return partialEntity;
  }
}
