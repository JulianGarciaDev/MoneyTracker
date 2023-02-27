import { AccountEntity } from "../Domain/AccountEntity";
import { IAccountRepository } from "../Domain/IAccountRepository";

export class GetAccount {
  constructor(private accountRepository: IAccountRepository) {}

  async byUuid(uuid: string): Promise<AccountEntity> {
    return await this.accountRepository.getAccount(uuid);
  }
}
