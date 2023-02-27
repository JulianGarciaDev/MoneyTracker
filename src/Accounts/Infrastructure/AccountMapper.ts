import { AccountEntity } from "../Domain/AccountEntity";
import { AccountModel } from "./AccountModel";

export class AccountMapper {
  modelToEntity(accountModel: AccountModel): AccountEntity {
    return {
      uuid: accountModel.uuid,
      name: accountModel.name,
      icon: accountModel.icon,
      type: accountModel.type,
      currency: accountModel.currency,
      visible: accountModel.visible,
      enable: accountModel.enable,
    };
  }
}
