import { EqType } from "../../Shared/Domain/EqType";
import { PartialCategoryEntity } from "../Domain/CategoryEntity";
import { ICategoryRepository } from "../Domain/ICategoryRepository";

export class CategoryExists {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async byParams(params: EqType<PartialCategoryEntity>): Promise<Boolean> {
    const result = await this.categoryRepository.getCategoriesBy(params);
    return result.length != 0;
  }

  async byUuid(uuid: string): Promise<Boolean> {
    const searchParams = {
      eq: { uuid: uuid },
    } as EqType<PartialCategoryEntity>;
    return await this.byParams(searchParams);
  }

  async byName(name: string): Promise<Boolean> {
    const searchParams = {
      eq: { name: name },
    } as EqType<PartialCategoryEntity>;
    return await this.byParams(searchParams);
  }

  async byNameInOtherUuid(name: string, uuid: string): Promise<Boolean> {
    const searchParams = {
      eq: { name: name },
      neq: { uuid: uuid },
    } as EqType<PartialCategoryEntity>;
    return await this.byParams(searchParams);
  }
}
