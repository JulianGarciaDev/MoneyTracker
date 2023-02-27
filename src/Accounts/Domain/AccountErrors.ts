export class AccountNameDuplicatedError extends Error {
  constructor() {
    super("Account name already exists");
  }
}

export class AccountNameRequiredError extends Error {
  constructor() {
    super("Account name is required");
  }
}

export class AccountNotFoundError extends Error {
  constructor() {
    super("Account not found");
  }
}

export class AccountUuidDuplicatedError extends Error {
  constructor() {
    super("Account uuid already exists");
  }
}
