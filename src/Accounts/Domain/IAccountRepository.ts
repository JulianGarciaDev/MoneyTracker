import { EqType } from "../../Shared/Domain/EqType";
import { AccountEntity, PartialAccountEntity } from "./AccountEntity";

export interface IAccountRepository {
  createAccount(account: AccountEntity): Promise<Boolean>;
  updateAccount(account: PartialAccountEntity): Promise<Boolean>;
  getAccount(uuid: string): Promise<AccountEntity>;
  getAccountsBy(
    accountParams: EqType<PartialAccountEntity>
  ): Promise<AccountEntity[]>;
  disableAccount(uuid: string): Promise<Boolean>;
}
