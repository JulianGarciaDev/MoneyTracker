import { CategoryEntity } from "../Domain/CategoryEntity";
import { CategoryModel } from "./CategoryModel";

export class CategoryMapper {
  modelToEntity(categoryModel: CategoryModel): CategoryEntity {
    return {
      uuid: categoryModel.uuid,
      name: categoryModel.name,
      icon: categoryModel.icon,
      visible: categoryModel.visible,
      enable: categoryModel.enable,
      parentUuid: categoryModel.parent_uuid,
    };
  }
}
