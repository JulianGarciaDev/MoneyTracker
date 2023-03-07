require("dotenv").config();
import { CreateCategory } from "../../../src/Categories/Application/CreateCategory";
import { CategoryEntity } from "../../../src/Categories/Domain/CategoryEntity";
import { CategoriesSQLite } from "../../../src/Categories/Infrastructure/Persistence/CategoriesSQLite";
import { DataFile } from "../../../src/Shared/Infrastructure/Persistence/DataFile";

async function insertCategories() {
  const dbFile = process.env.DB_PATH;
  const categoryRepository = new CategoriesSQLite(dbFile);

  const dataFilePath = "./data/categories.fixtures.json";
  const dataFile = new DataFile(dataFilePath);
  const categoriesList = JSON.parse(dataFile.read());

  const categories = categoriesList as CategoryEntity[];
  await categoryRepository.insertCategories(categories);
}

module.exports = insertCategories();
