export class CurrencyNotFoundError extends Error {
  constructor() {
    super("Currency not found");
  }
}
