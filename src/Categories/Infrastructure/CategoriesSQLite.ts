import { SQLite } from "../../Shared/Infrastructure/SQLite";
import { UnionSQL } from "../../Shared/Infrastructure/UnionSQL";
import { EqType } from "../../Shared/Domain/EqType";

import {
  CategoryEntity,
  PartialCategoryEntity,
} from "../Domain/CategoryEntity";
import { ICategoryRepository } from "../Domain/ICategoryRepository";
import { CategoryMapper } from "./CategoryMapper";
import { CategoryModel } from "./CategoryModel";
import {
  CategoryNotFoundError,
  CategoryUuidDuplicatedError,
} from "../Domain/CategoryErrors";

export class CategoriesSQLite implements ICategoryRepository {
  protected sqlite: SQLite;
  protected mapper: CategoryMapper;

  constructor(protected dbFile?: string) {
    this.sqlite = new SQLite(this.dbFile);
    this.mapper = new CategoryMapper();
  }

  async createCategory(category: CategoryEntity): Promise<Boolean> {
    try {
      await this.getCategory(category.uuid);
      throw new CategoryUuidDuplicatedError();
    } catch {
      const sql = `
        INSERT INTO Categories (uuid, name, icon, visible, enable, parent_uuid)
        VALUES (?, ?, ?, ?, ?, ?);
        `;
      const params = [
        category.uuid,
        category.name,
        category.icon,
        category.visible,
        category.enable,
        category.parentUuid,
      ];
      await this.sqlite.run(sql, params);
      return true;
    }
  }

  async updateCategory(category: PartialCategoryEntity): Promise<Boolean> {
    const sqlUpdate = `UPDATE Categories SET `;
    let [fields, params] = this.createParamsSql(category, UnionSQL.Set);
    fields += "modified_at = ? ";
    params.push(new Date());
    const where = "WHERE uuid = ?;";
    params.push(category.uuid);
    const sql = sqlUpdate + fields + where;
    const result = await this.sqlite.run(sql, params);
    return result;
  }

  async getCategory(uuid: string): Promise<CategoryEntity> {
    const sql = `
      SELECT * FROM Categories
      WHERE enable = true AND uuid = ?;
    `;
    const result = await this.sqlite.get<CategoryModel>(sql, [uuid]);
    if (!result) {
      throw new CategoryNotFoundError();
    }
    return this.mapper.modelToEntity(result);
  }

  async getCategoriesBy(
    categoryParams: EqType<PartialCategoryEntity>
  ): Promise<CategoryEntity[]> {
    let categoryEntities: CategoryEntity[] = [];
    let sql = `
      SELECT * FROM Categories WHERE 
    `;
    let [fields, params] = this.sqlite.createWhereAnd(
      categoryParams,
      this.createParamsSql
    );
    sql += fields + "enable = true;";
    const result = await this.sqlite.all<CategoryModel>(sql, params);
    result.forEach((row) => {
      const categoryEntity = this.mapper.modelToEntity(row);
      categoryEntities.push(categoryEntity);
    });
    return categoryEntities;
  }

  async disableCategory(uuid: string): Promise<Boolean> {
    const sql = `
      UPDATE Categories SET enable = false, modified_at = ?
      WHERE uuid = ?;
    `;
    const params = [new Date(), uuid];
    const result = await this.sqlite.run(sql, params);
    return result;
  }

  private createParamsSql(
    category: PartialCategoryEntity,
    union: string,
    eqType: string = "="
  ): [string, any[]] {
    let fields = "";
    let params: any[] = [];
    if (union == UnionSQL.Set) {
      eqType = "=";
    }
    if (union != UnionSQL.Set && "uuid" in category) {
      fields += "uuid " + eqType + " ?" + union;
      params.push(category.uuid);
    }
    if ("name" in category) {
      fields += "name " + eqType + " ?" + union;
      params.push(category.name);
    }
    if ("icon" in category) {
      fields += "icon " + eqType + " ?" + union;
      params.push(category.icon);
    }
    if ("visible" in category) {
      fields += "visible " + eqType + " ?" + union;
      params.push(category.visible);
    }
    if ("enable" in category) {
      fields += "enable " + eqType + " ?" + union;
      params.push(category.enable);
    }
    if ("parentUuid" in category) {
      fields += "parent_uuid " + eqType + " ?" + union;
      params.push(category.parentUuid);
    }
    return [fields, params];
  }
}
