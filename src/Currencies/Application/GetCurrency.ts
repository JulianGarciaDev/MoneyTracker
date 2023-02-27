import { CurrencyEntity } from "../Domain/CurrencyEntity";
import { ICurrencyRepository } from "../Domain/IAccountRepository";

export class GetCurrency {
  constructor(private currencyRepository: ICurrencyRepository) {}

  execute(code: string): CurrencyEntity {
    return this.currencyRepository.getCurrency(code);
  }
}
