export class BadRequestError extends Error {
  status: number = 400;
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends Error {
  status: number = 404;
  constructor(message: string) {
    super(message);
  }
}

export class ConflictError extends Error {
  status: number = 409;
  constructor(message: string) {
    super(message);
  }
}

export class InternalServerError extends Error {
  status: number = 500;
  constructor(message: string) {
    super(message);
  }
}
