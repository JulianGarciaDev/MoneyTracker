import { CurrencyEntity } from "../Domain/CurrencyEntity";
import { ICurrencyRepository } from "../Domain/IAccountRepository";

export class GetAllCurrencies {
  constructor(private readonly currencyRepository: ICurrencyRepository) {}

  execute(): CurrencyEntity[] {
    return this.currencyRepository.getAllCurrencies();
  }
}
