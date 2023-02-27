export interface AccountEntity {
  uuid: string;
  name: string;
  icon: string;
  type: string;
  currency: string;
  visible: boolean;
  enable: boolean;
}

export type PartialAccountEntity = Partial<AccountEntity>;
