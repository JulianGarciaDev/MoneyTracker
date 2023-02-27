import { AccountNotFoundError } from "../Domain/AccountErrors";
import { IAccountRepository } from "../Domain/IAccountRepository";
import { AccountExists } from "./AccountExists";

export class DeleteAccount {
  private accountExists: AccountExists;

  constructor(private readonly accountRepository: IAccountRepository) {
    this.accountExists = new AccountExists(accountRepository);
  }

  async disable(uuid: string): Promise<Boolean> {
    await this.checkUuidExists(uuid);
    return await this.accountRepository.disableAccount(uuid);
  }

  private async checkUuidExists(uuid: string): Promise<void> {
    const exists = await this.accountExists.byUuid(uuid);
    if (!exists) throw new AccountNotFoundError();
  }
}
