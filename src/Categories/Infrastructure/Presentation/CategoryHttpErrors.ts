import { Response } from "express";
import { CatchHttpErrors } from "../../../Shared/Infrastructure/Presentation/CatchHttpErrors";
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../../../Shared/Infrastructure/Presentation/HttpErrors";
import {
  CategoryNameDuplicatedError,
  CategoryNotFoundError,
  CategoryUuidDuplicatedError,
  ParentCategoryNotFoundError,
} from "../../Domain/CategoryErrors";

export class CategoryHttpErrors {
  constructor(protected err: any) {}

  catchAndResponse(res: Response) {
    if (
      this.err instanceof CategoryNotFoundError ||
      this.err instanceof ParentCategoryNotFoundError
    ) {
      this.err = new NotFoundError(this.err.message);
    } else if (this.err instanceof CategoryNameDuplicatedError) {
      this.err = new ConflictError(this.err.message);
    } else if (this.err instanceof CategoryUuidDuplicatedError) {
      this.err = new InternalServerError(this.err.message);
    }
    const catchHttpError = new CatchHttpErrors(res, this.err);
    catchHttpError.response();
  }
}
