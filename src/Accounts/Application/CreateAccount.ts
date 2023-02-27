import { v4 as uuidv4 } from "uuid";

import { AccountEntity, PartialAccountEntity } from "../Domain/AccountEntity";
import { IAccountRepository } from "../Domain/IAccountRepository";
import { GetAccount } from "./GetAccount";
import {
  AccountNameDuplicatedError,
  AccountNameRequiredError,
} from "../Domain/AccountErrors";
import { AccountExists } from "./AccountExists";
import { defaultCurrency, defaultType } from "../Domain/AccountDefaults";

export class CreateAccount {
  protected accountExists: AccountExists;

  constructor(private readonly accountRepository: IAccountRepository) {
    this.accountExists = new AccountExists(this.accountRepository);
  }

  async visible(partialEntity: PartialAccountEntity): Promise<AccountEntity> {
    partialEntity = await this.checkParams(partialEntity);
    const newUuid = uuidv4();
    partialEntity.uuid = newUuid;
    partialEntity.visible = true;
    partialEntity.enable = true;
    const entity = partialEntity as AccountEntity;
    await this.accountRepository.createAccount(entity);
    return await new GetAccount(this.accountRepository).byUuid(newUuid);
  }

  private async checkParams(
    partialEntity: PartialAccountEntity
  ): Promise<PartialAccountEntity> {
    await this.checkName(partialEntity.name);
    partialEntity = this.checkIconAccount(partialEntity);
    partialEntity = this.checkTypeAccount(partialEntity);
    partialEntity = this.checkCurrencyAccount(partialEntity);
    return partialEntity;
  }

  private async checkName(name: string | undefined): Promise<void> {
    if (!name) throw new AccountNameRequiredError();
    const duplicated = await this.accountExists.byName(name);
    if (duplicated) throw new AccountNameDuplicatedError();
  }

  private checkIconAccount(
    partialEntity: PartialAccountEntity
  ): PartialAccountEntity {
    partialEntity.icon =
      partialEntity.icon ||
      partialEntity.name?.substring(0, 2).toUpperCase() ||
      "XX";
    return partialEntity;
  }

  private checkTypeAccount(
    partialEntity: PartialAccountEntity
  ): PartialAccountEntity {
    partialEntity.type = partialEntity.type || defaultType;
    return partialEntity;
  }

  private checkCurrencyAccount(
    partialEntity: PartialAccountEntity
  ): PartialAccountEntity {
    partialEntity.currency = partialEntity.currency || defaultCurrency;
    return partialEntity;
  }
}
