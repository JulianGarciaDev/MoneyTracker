import { SQLite } from "../../../Shared/Infrastructure/Persistence/SQLite";
import { UnionSQL } from "../../../Shared/Infrastructure/Persistence/UnionSQL";
import { EqType } from "../../../Shared/Domain/EqType";

import {
  AccountEntity,
  PartialAccountEntity,
} from "../../Domain/AccountEntity";
import { IAccountRepository } from "../../Domain/IAccountRepository";
import { AccountMapper } from "./AccountMapper";
import { AccountModel } from "./AccountModel";
import {
  AccountNotFoundError,
  AccountUuidDuplicatedError,
} from "../../Domain/AccountErrors";

export class AccountsSQLite implements IAccountRepository {
  protected sqlite: SQLite;
  protected mapper: AccountMapper;

  constructor(protected dbFile?: string) {
    this.sqlite = new SQLite(this.dbFile);
    this.mapper = new AccountMapper();
  }

  async createAccount(account: AccountEntity): Promise<Boolean> {
    try {
      await this.getAccount(account.uuid);
      throw new AccountUuidDuplicatedError();
    } catch {
      const sql = `
        INSERT INTO Accounts
        (uuid, name, icon, type, currency, visible, enable)
        VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
      const params = [
        account.uuid,
        account.name,
        account.icon,
        account.type,
        account.currency,
        account.visible,
        account.enable,
      ];
      await this.sqlite.run(sql, params);
      return true;
    }
  }

  async updateAccount(account: PartialAccountEntity): Promise<Boolean> {
    const sqlUpdate = `UPDATE Accounts SET `;
    let [fields, params] = this.createParamsSql(account, UnionSQL.Set);
    fields += "modified_at = ? ";
    params.push(new Date());
    const where = "WHERE uuid = ?;";
    params.push(account.uuid);
    const sql = sqlUpdate + fields + where;
    const result = await this.sqlite.run(sql, params);
    return result;
  }

  async getAccount(uuid: string): Promise<AccountEntity> {
    const sql = `
      SELECT * FROM Accounts
      WHERE enable = true AND uuid = ?;
    `;
    const result = await this.sqlite.get<AccountModel>(sql, [uuid]);
    if (!result) {
      throw new AccountNotFoundError();
    }
    return this.mapper.modelToEntity(result);
  }

  async getAccountsBy(
    accountParams: EqType<PartialAccountEntity>
  ): Promise<AccountEntity[]> {
    let accountEntities: AccountEntity[] = [];
    let sql = `
      SELECT * FROM Accounts WHERE 
    `;
    let [fields, params] = this.sqlite.createWhereAnd(
      accountParams,
      this.createParamsSql
    );
    sql += fields + "enable = true;";
    const result = await this.sqlite.all<AccountModel>(sql, params);
    result.forEach((row) => {
      const accountEntity = this.mapper.modelToEntity(row);
      accountEntities.push(accountEntity);
    });
    return accountEntities;
  }

  async disableAccount(uuid: string): Promise<Boolean> {
    const sql = `
      UPDATE Accounts SET enable = false, modified_at = ?
      WHERE uuid = ?;
    `;
    const params = [new Date(), uuid];
    const result = await this.sqlite.run(sql, params);
    return result;
  }

  private createParamsSql(
    account: PartialAccountEntity,
    union: string,
    eqType: string = "="
  ): [string, any[]] {
    let fields = "";
    let params: any[] = [];
    if (union == UnionSQL.Set) {
      eqType = "=";
    }
    if (union != UnionSQL.Set && "uuid" in account) {
      fields += "uuid " + eqType + " ?" + union;
      params.push(account.uuid);
    }
    if ("name" in account) {
      fields += "name " + eqType + " ?" + union;
      params.push(account.name);
    }
    if ("icon" in account) {
      fields += "icon " + eqType + " ?" + union;
      params.push(account.icon);
    }
    if ("visible" in account) {
      fields += "visible " + eqType + " ?" + union;
      params.push(account.visible);
    }
    if ("enable" in account) {
      fields += "enable " + eqType + " ?" + union;
      params.push(account.enable);
    }
    if ("parentUuid" in account) {
      fields += "parent_uuid " + eqType + " ?" + union;
      params.push(account.parentUuid);
    }
    return [fields, params];
  }
}
