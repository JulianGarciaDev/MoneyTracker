import { Response } from "express";
import { CatchHttpErrors } from "../../Shared/Infrastructure/Errors/CatchHttpErrors";
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../../Shared/Infrastructure/Errors/HttpErrors";
import {
  AccountNameDuplicatedError,
  AccountNotFoundError,
  AccountUuidDuplicatedError,
} from "../Domain/AccountErrors";

export class AccountHttpErrors {
  constructor(protected err: any) {}

  catchAndResponse(res: Response) {
    if (this.err instanceof AccountNotFoundError) {
      this.err = new NotFoundError(this.err.message);
    } else if (this.err instanceof AccountNameDuplicatedError) {
      this.err = new ConflictError(this.err.message);
    } else if (this.err instanceof AccountUuidDuplicatedError) {
      this.err = new InternalServerError(this.err.message);
    }
    const catchHttpError = new CatchHttpErrors(res, this.err);
    catchHttpError.response();
  }
}
