import { AccountEntity, PartialAccountEntity } from "../Domain/AccountEntity";
import {
  AccountNameDuplicatedError,
  AccountNotFoundError,
} from "../Domain/AccountErrors";
import { IAccountRepository } from "../Domain/IAccountRepository";
import { AccountExists } from "./AccountExists";
import { GetAccount } from "./GetAccount";

export class UpdateAccount {
  private accountExists: AccountExists;

  constructor(private readonly accountRepository: IAccountRepository) {
    this.accountExists = new AccountExists(accountRepository);
  }

  async nameUnique(
    partialEntity: PartialAccountEntity,
    uuid: string
  ): Promise<AccountEntity> {
    partialEntity = this.normalizeEntity(partialEntity);
    await this.checkParams(partialEntity, uuid);
    partialEntity.uuid = uuid;
    await this.accountRepository.updateAccount(partialEntity);
    return await new GetAccount(this.accountRepository).byUuid(uuid);
  }

  private normalizeEntity(
    partialEntity: PartialAccountEntity
  ): PartialAccountEntity {
    if ("name" in partialEntity) {
      partialEntity.name = String(partialEntity.name);
    }
    return partialEntity;
  }

  private async checkParams(
    partialEntity: PartialAccountEntity,
    uuid: string
  ): Promise<void> {
    await this.checkUuidExists(uuid);
    await this.checkNameNotInOtherUuid(partialEntity, uuid);
  }

  private async checkUuidExists(uuid: string): Promise<void> {
    const exists = await this.accountExists.byUuid(uuid);
    if (!exists) throw new AccountNotFoundError();
  }

  private async checkNameNotInOtherUuid(
    partialEntity: PartialAccountEntity,
    uuid: string
  ): Promise<void> {
    if ("name" in partialEntity && partialEntity.name) {
      const exists = await this.accountExists.byNameInOtherUuid(
        partialEntity.name,
        uuid
      );
      if (exists) throw new AccountNameDuplicatedError();
    }
  }
}
