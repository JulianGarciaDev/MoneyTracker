require("dotenv").config();
import Router from "express";

import { CheckParams } from "../../Shared/Domain/CheckParams";
import {
  BadUuidError,
  NameRequiredError,
} from "../../Shared/Infrastructure/Errors/RequestErrors";
import { AccountHttpErrors } from "./AccountHttpErrors";
import { AccountsSQLite } from "./AccountsSQLite";
import { PartialAccountEntity } from "../Domain/AccountEntity";

import { CreateAccount } from "../Application/CreateAccount";
import { GetManyAccounts } from "../Application/GetManyAccounts";
import { GetAccount } from "../Application/GetAccount";
import { UpdateAccount } from "../Application/UpdateAccount";
import { DeleteAccount } from "../Application/DeleteAccount";

export const router = Router();
const dbFile = process.env.DB_PATH;
const accountRepository = new AccountsSQLite(dbFile);

router.get("/", async (req, res) => {
  try {
    const categories = await new GetManyAccounts(accountRepository).all();
    res.json(categories);
  } catch (err: any) {
    new AccountHttpErrors(err).catchAndResponse(res);
  }
});

router.get("/:uuid", async (req, res) => {
  try {
    // Check request params
    const accountUuid = req.params.uuid;
    const ok = new CheckParams().uuids([accountUuid]);
    if (!ok) throw new BadUuidError();
    // Use case
    const getAccount = new GetAccount(accountRepository);
    const account = await getAccount.byUuid(accountUuid);
    res.json(account);
  } catch (err: any) {
    new AccountHttpErrors(err).catchAndResponse(res);
  }
});

router.post("/", async (req, res) => {
  try {
    // Check request params
    const reqPartialAccount = req.body as PartialAccountEntity;
    if (!("name" in reqPartialAccount) || !reqPartialAccount.name) {
      throw new NameRequiredError();
    }
    // Use case
    const createAccount = new CreateAccount(accountRepository);
    const account = await createAccount.visible(reqPartialAccount);
    res.status(201).json(account);
  } catch (err: any) {
    new AccountHttpErrors(err).catchAndResponse(res);
  }
});

router.put("/:uuid", async (req, res) => {
  try {
    // Check params
    const accountUuid = req.params.uuid;
    const ok = new CheckParams().uuids([accountUuid]);
    if (!ok) throw new BadUuidError();
    // Use case
    const reqPartialAccount = req.body as PartialAccountEntity;
    const updateAccount = new UpdateAccount(accountRepository);
    const account = await updateAccount.nameUnique(
      reqPartialAccount,
      accountUuid
    );
    res.json(account);
  } catch (err: any) {
    new AccountHttpErrors(err).catchAndResponse(res);
  }
});

router.delete("/:uuid", async (req, res) => {
  try {
    // Check params
    const accountUuid = req.params.uuid;
    const ok = new CheckParams().uuids([accountUuid]);
    if (!ok) throw new BadUuidError();
    // Use case
    const deleteAccount = new DeleteAccount(accountRepository);
    const deleted = await deleteAccount.disable(accountUuid);
    res.json(deleted);
  } catch (err: any) {
    new AccountHttpErrors(err).catchAndResponse(res);
  }
});
