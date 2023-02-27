const uuid = require("uuid");

export class CheckParams {
  uuids(params: any[]): boolean {
    return params.every((param) => uuid.validate(param));
  }
  numbers(params: any[]): boolean {
    return params.every((param) => !isNaN(param));
  }

  defined(params: any[]): boolean {
    return params.every((param) => param ?? false);
  }
}
