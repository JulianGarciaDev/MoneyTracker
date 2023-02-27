export interface CategoryEntity {
  uuid: string;
  name: string;
  icon: string;
  visible: boolean;
  enable: boolean;
  parentUuid: string;
  children?: CategoryEntity[];
}

export type PartialCategoryEntity = Partial<CategoryEntity>;
