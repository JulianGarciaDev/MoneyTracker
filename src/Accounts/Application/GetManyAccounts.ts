import { EqType } from "../../Shared/Domain/EqType";
import { AccountEntity, PartialAccountEntity } from "../Domain/AccountEntity";
import { IAccountRepository } from "../Domain/IAccountRepository";

export class GetManyAccounts {
  constructor(private readonly categoryRepository: IAccountRepository) {}

  async all(): Promise<AccountEntity[]> {
    const params = {} as EqType<PartialAccountEntity>;
    return await this.categoryRepository.getAccountsBy(params);
  }
}
