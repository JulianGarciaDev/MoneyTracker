import { CategoryNotFoundError } from "../Domain/CategoryErrors";
import { ICategoryRepository } from "../Domain/ICategoryRepository";
import { CategoryExists } from "./CategoryExists";

export class DeleteCategory {
  private categoryExists: CategoryExists;

  constructor(private readonly categoryRepository: ICategoryRepository) {
    this.categoryExists = new CategoryExists(categoryRepository);
  }

  async disable(categoryUuid: string): Promise<Boolean> {
    await this.checkUuidExists(categoryUuid);
    return await this.categoryRepository.disableCategory(categoryUuid);
  }

  private async checkUuidExists(categoryUuid: string): Promise<void> {
    const exists = await this.categoryExists.byUuid(categoryUuid);
    if (!exists) throw new CategoryNotFoundError();
  }
}
