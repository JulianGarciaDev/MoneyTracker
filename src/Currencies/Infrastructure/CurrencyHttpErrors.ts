import { Response } from "express";
import { CatchHttpErrors } from "../../Shared/Infrastructure/Errors/CatchHttpErrors";
import { NotFoundError } from "../../Shared/Infrastructure/Errors/HttpErrors";
import { CurrencyNotFoundError } from "../Domain/CurrencyErrors";

export class CurrencyHttpErrors {
  constructor(protected err: any) {}

  catchAndResponse(res: Response) {
    if (this.err instanceof CurrencyNotFoundError) {
      this.err = new NotFoundError(this.err.message);
    }
    const catchHttpError = new CatchHttpErrors(res, this.err);
    catchHttpError.response();
  }
}
