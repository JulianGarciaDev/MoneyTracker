require("dotenv").config();
import Router from "express";

import { CheckParams } from "../../Shared/Domain/CheckParams";
import {
  BadUuidError,
  NameRequiredError,
} from "../../Shared/Infrastructure/Errors/RequestErrors";
import { CategoryHttpErrors } from "./CategoryHttpErrors";
import { CategoriesSQLite } from "./CategoriesSQLite";
import { PartialCategoryEntity } from "../Domain/CategoryEntity";

import { CreateCategory } from "../Application/CreateCategory";
import { GetManyCategories } from "../Application/GetManyCategories";
import { GetCategory } from "../Application/GetCategory";
import { UpdateCategory } from "../Application/UpdateCategory";
import { DeleteCategory } from "../Application/DeleteCategory";

export const router = Router();
const dbFile = process.env.DB_PATH;
const categoryRepository = new CategoriesSQLite(dbFile);

router.get("/", async (req, res) => {
  try {
    const categories = await new GetManyCategories(categoryRepository).main();
    res.json(categories);
  } catch (err: any) {
    new CategoryHttpErrors(err).catchAndResponse(res);
  }
});

router.get("/:uuid", async (req, res) => {
  try {
    // Check request params
    const categoryUuid = req.params.uuid;
    const ok = new CheckParams().uuids([categoryUuid]);
    if (!ok) throw new BadUuidError();
    // Use case
    const getCategory = new GetCategory(categoryRepository);
    const category = await getCategory.byUuid(categoryUuid);
    res.json(category);
  } catch (err: any) {
    new CategoryHttpErrors(err).catchAndResponse(res);
  }
});

router.get("/:uuid/children", async (req, res) => {
  try {
    // Check request params
    const categoryUuid = req.params.uuid;
    const ok = new CheckParams().uuids([categoryUuid]);
    if (!ok) throw new BadUuidError();
    // Use case
    const getCategory = new GetCategory(categoryRepository);
    const category = await getCategory.withChildren(categoryUuid);
    res.json(category);
  } catch (err: any) {
    new CategoryHttpErrors(err).catchAndResponse(res);
  }
});

router.post("/", async (req, res) => {
  try {
    // Check request params
    const reqPartialCategory = req.body as PartialCategoryEntity;
    if (!("name" in reqPartialCategory) || !reqPartialCategory.name) {
      throw new NameRequiredError();
    }
    // Use case
    const createCategory = new CreateCategory(categoryRepository);
    const category = await createCategory.visible(reqPartialCategory);
    res.status(201).json(category);
  } catch (err: any) {
    new CategoryHttpErrors(err).catchAndResponse(res);
  }
});

router.put("/:uuid", async (req, res) => {
  try {
    // Check params
    const categoryUuid = req.params.uuid;
    const ok = new CheckParams().uuids([categoryUuid]);
    if (!ok) throw new BadUuidError();
    // Use case
    const reqPartialCategory = req.body as PartialCategoryEntity;
    const updateCategory = new UpdateCategory(categoryRepository);
    const category = await updateCategory.nameUnique(
      reqPartialCategory,
      categoryUuid
    );
    res.json(category);
  } catch (err: any) {
    new CategoryHttpErrors(err).catchAndResponse(res);
  }
});

router.delete("/:uuid", async (req, res) => {
  try {
    // Check params
    const categoryUuid = req.params.uuid;
    const ok = new CheckParams().uuids([categoryUuid]);
    if (!ok) throw new BadUuidError();
    // Use case
    const deleteCategory = new DeleteCategory(categoryRepository);
    const deleted = await deleteCategory.disable(categoryUuid);
    res.json(deleted);
  } catch (err: any) {
    new CategoryHttpErrors(err).catchAndResponse(res);
  }
});
