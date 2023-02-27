import { EqType } from "../../Shared/Domain/EqType";
import { PartialAccountEntity } from "../Domain/AccountEntity";
import { IAccountRepository } from "../Domain/IAccountRepository";

export class AccountExists {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async byParams(params: EqType<PartialAccountEntity>): Promise<Boolean> {
    const result = await this.accountRepository.getAccountsBy(params);
    return result.length != 0;
  }

  async byUuid(uuid: string): Promise<Boolean> {
    const searchParams = {
      eq: { uuid: uuid },
    } as EqType<PartialAccountEntity>;
    return await this.byParams(searchParams);
  }

  async byName(name: string): Promise<Boolean> {
    const searchParams = {
      eq: { name: name },
    } as EqType<PartialAccountEntity>;
    return await this.byParams(searchParams);
  }

  async byNameInOtherUuid(name: string, uuid: string): Promise<Boolean> {
    const searchParams = {
      eq: { name: name },
      neq: { uuid: uuid },
    } as EqType<PartialAccountEntity>;
    return await this.byParams(searchParams);
  }
}
