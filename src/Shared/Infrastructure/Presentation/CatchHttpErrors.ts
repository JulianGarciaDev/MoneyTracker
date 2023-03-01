import { Response } from "express";

export class CatchHttpErrors {
  private status: number = 500;

  constructor(protected res: Response, protected err: any) {
    if ("status" in err) {
      this.status = err.status;
    }
  }

  response() {
    this.res.status(this.status).json({ error: this.err.message });
  }
}
