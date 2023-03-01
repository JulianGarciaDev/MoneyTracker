import { DataFile } from "../../../Shared/Infrastructure/Persistence/DataFile";
import { CurrencyEntity } from "../../Domain/CurrencyEntity";
import { CurrencyNotFoundError } from "../../Domain/CurrencyErrors";
import { ICurrencyRepository } from "../../Domain/IAccountRepository";

export class CurrenciesFile implements ICurrencyRepository {
  protected dataFile: DataFile;

  constructor(protected pathFile?: string) {
    this.dataFile = new DataFile(this.pathFile);
  }

  getCurrency(code: string): CurrencyEntity {
    const currencies = this.getAllCurrencies();
    const result = currencies.find(
      (cur) => cur.code.toUpperCase() == code.toUpperCase()
    );
    if (!result) throw new CurrencyNotFoundError();
    return result as CurrencyEntity;
  }

  getAllCurrencies(): CurrencyEntity[] {
    return JSON.parse(this.dataFile.read()) as CurrencyEntity[];
  }
}
