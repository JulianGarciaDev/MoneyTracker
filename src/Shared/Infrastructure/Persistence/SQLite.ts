import sqlite3 from "sqlite3";
import { Database, open, Statement } from "sqlite";
import { UnionSQL } from "./UnionSQL";
import { EqType } from "../../Domain/EqType";

sqlite3.verbose();

export class SQLite {
  constructor(private readonly dbFile?: string) {}

  async connect(): Promise<Database> {
    return await open({
      filename: this.dbFile || "",
      driver: sqlite3.Database,
    });
  }

  private async prepareSql(
    sql: string,
    params: any[]
  ): Promise<[Database, Statement]> {
    const db = await this.connect();
    const stmt = await db.prepare(sql);
    await stmt.bind(params);
    return [db, stmt];
  }

  private async finalizeSql(db: Database, stmt: Statement) {
    await stmt.finalize();
    await db.close();
  }

  async all<T>(sql: string, params: any[]): Promise<T[]> {
    const [db, stmt] = await this.prepareSql(sql, params);
    const result = await stmt.all<T[]>();
    await this.finalizeSql(db, stmt);
    return result;
  }

  async get<T>(sql: string, params: any[]): Promise<T | undefined> {
    const [db, stmt] = await this.prepareSql(sql, params);
    const result = await stmt.get<T>();
    await this.finalizeSql(db, stmt);
    return result;
  }

  async run(sql: string, params: any[]): Promise<Boolean> {
    const [db, stmt] = await this.prepareSql(sql, params);
    const result = await stmt.run();
    await this.finalizeSql(db, stmt);
    return true;
  }

  createWhereAnd(eqTypeSql: EqType<any>, createParams: any): [string, any[]] {
    let fields = "";
    let params: any[] = [];
    if (eqTypeSql.eq) {
      let [fieldsEq, paramsEq] = createParams(
        eqTypeSql.eq,
        UnionSQL.WhereAnd,
        "="
      );
      fields += fieldsEq;
      params = params.concat(paramsEq);
    }
    if (eqTypeSql.neq) {
      let [fieldsNeq, paramsNeq] = createParams(
        eqTypeSql.neq,
        UnionSQL.WhereAnd,
        "!="
      );
      fields += fieldsNeq;
      params = params.concat(paramsNeq);
    }
    return [fields, params];
  }

  getFormattedDateTime(): string {
    // format: 28/02/2023, 14:18:11
    const locale = "es-ES";
    return new Date().toLocaleString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      second: "2-digit",
    });
  }
}
