import { BadRequestError } from "./HttpErrors";

export class BadUuidError extends BadRequestError {
  constructor() {
    super("Bad uuid");
  }
}

export class BadNumberError extends BadRequestError {
  constructor() {
    super("Bad number");
  }
}

export class UndefinedError extends BadRequestError {
  constructor() {
    super("Undefined");
  }
}

export class NameRequiredError extends BadRequestError {
  constructor() {
    super("Name is required");
  }
}

export class BadCodeError extends BadRequestError {
  constructor() {
    super("Bad code");
  }
}
