import { Response } from "express";
import { CatchHttpErrors } from "../../../Shared/Infrastructure/Presentation/CatchHttpErrors";
import { NotFoundError } from "../../../Shared/Infrastructure/Presentation/HttpErrors";
import { CurrencyNotFoundError } from "../../Domain/CurrencyErrors";

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
