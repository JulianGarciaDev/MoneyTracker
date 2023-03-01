require("dotenv").config();
import Router from "express";

import { CheckParams } from "../../../Shared/Domain/CheckParams";
import { AccountHttpErrors } from "./AccountHttpErrors";
import { AccountsSQLite } from "../Persistence/AccountsSQLite";
import { PartialAccountEntity } from "../../Domain/AccountEntity";

import { CreateAccount } from "../../Application/CreateAccount";
import { GetManyAccounts } from "../../Application/GetManyAccounts";
import { GetAccount } from "../../Application/GetAccount";
import { UpdateAccount } from "../../Application/UpdateAccount";
import { DeleteAccount } from "../../Application/DeleteAccount";
import {
  BadUuidError,
  NameRequiredError,
} from "../../../Shared/Infrastructure/Presentation/RequestErrors";

const dbFile = process.env.DB_PATH;
const accountRepository = new AccountsSQLite(dbFile);

export const router = Router();

/**
 * @openapi
 * /account/:
 *  get:
 *    tags: [Accounts]
 *    summary: Get all accounts
 *    description: Use to request all accounts
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: List of accounts
 *        type: json
 */
router.get("/", async (req, res) => {
  try {
    const categories = await new GetManyAccounts(accountRepository).all();
    res.json(categories);
  } catch (err: any) {
    new AccountHttpErrors(err).catchAndResponse(res);
  }
});

/**
 * @openapi
 * /account/{uuid}:
 *  get:
 *    tags: [Accounts]
 *    summary: Get one account
 *    description: Use to request one account
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: uuid
 *        description: Uuid of account
 *    responses:
 *      200:
 *        description: Account by uuid
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AccountResponse'
 *      400:
 *        description: Bad uuid
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Bad uuid
 *      404:
 *        description: Account not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Account not found
 */
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

/**
 * @openapi
 * /account/:
 *  post:
 *    tags: [Accounts]
 *    summary: Create a new account
 *    description: Use to create an account
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AccountCreate'
 *    responses:
 *      201:
 *        description: Account created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AccountResponse'
 *      400:
 *        description: Name is required
 *      409:
 *        description: Name already exists
 */
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

/**
 * @openapi
 * /account/{uuid}:
 *  put:
 *    tags: [Accounts]
 *    summary: Update an account
 *    description: Use to update an account
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: uuid
 *        description: Uuid of account
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AccountUpdate'
 *    responses:
 *      200:
 *        description: Account updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AccountResponse'
 *      400:
 *        description: Bad uuid
 *      404:
 *        description: Account not found
 *      409:
 *        description: Name already exists
 */
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

/**
 * @openapi
 * /account/{uuid}:
 *  delete:
 *    tags: [Accounts]
 *    summary: Delete an account
 *    description: Use to delete an account
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: uuid
 *        description: Uuid of account
 *    responses:
 *      200:
 *        description: Account deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: boolean
 *              example: true
 *      400:
 *        description: Bad uuid
 *      404:
 *        description: Account not found
 */
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
