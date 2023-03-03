import { CurrencyEntity } from "./CurrencyEntity";

export interface ICurrencyRepository {
  getCurrency(code: string): CurrencyEntity;
  getAllCurrencies(): CurrencyEntity[];
}
