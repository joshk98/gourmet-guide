import { BasicPgClient, Config, CreateDBConfig, Logger } from "./types";
/**
 * @deprecated Use `migrate` instead with `ensureDatabaseExists: true`.
 */
export declare function createDb(dbName: string, dbConfig: CreateDBConfig, config?: Config): Promise<void>;
export declare function runCreateQuery(dbName: string, log: Logger): (client: BasicPgClient) => Promise<void>;
