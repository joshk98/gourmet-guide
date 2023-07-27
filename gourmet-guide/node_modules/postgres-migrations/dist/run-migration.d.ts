import { Logger, Migration, BasicPgClient } from "./types";
export declare const runMigration: (migrationTableName: string, client: BasicPgClient, log?: Logger) => (migration: Migration) => Promise<Migration>;
