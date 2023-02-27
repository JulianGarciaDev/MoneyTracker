export class DataFile {
  private fs: any;

  constructor(private readonly dataFile?: string) {
    this.fs = require("fs");
  }

  read(): string {
    return this.fs.readFileSync(this.dataFile, { encoding: "utf8", flag: "r" });
  }
}
