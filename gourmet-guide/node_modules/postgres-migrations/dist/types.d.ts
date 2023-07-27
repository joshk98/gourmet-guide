import * as pg from "pg";
export interface Migration {
    readonly id: number;
    readonly name: string;
    readonly contents: string;
    readonly fileName: string;
    readonly hash: string;
    readonly sql: string;
}
export interface ConnectionParams {
    readonly user: string;
    readonly password: string;
    readonly host: string;
    readonly port: number;
}
export interface ClientParams {
    /** A connected Client, or a Pool Client. The caller is responsible for connecting and cleaning up. */
    readonly client: pg.Client | pg.PoolClient | pg.Pool;
}
export declare type EnsureDatabase = {
    /**
     * Might default to `true` in future versions
     * @default false
     */
    readonly ensureDatabaseExists: true;
    /**
     * The database to connect to when creating a database (if necessary).
     * @default postgres
     */
    readonly defaultDatabase?: string;
} | {
    readonly ensureDatabaseExists?: false;
};
/**
 * @deprecated Use `migrate` instead with `ensureDatabaseExists: true`.
 */
export declare type CreateDBConfig = (ConnectionParams & {
    /** The database to connect to when creating the new database. */
    readonly defaultDatabase?: string;
}) | ClientParams;
export declare type MigrateDBConfig = (ConnectionParams & {
    readonly database: string;
} & EnsureDatabase) | ClientParams;
export declare type Logger = (msg: string) => void;
export declare type Config = Partial<FullConfig>;
export interface FullConfig {
    readonly logger: Logger;
}
export declare class MigrationError extends Error {
    cause?: string;
}
export declare type FileType = "sql" | "js";
export interface BasicPgClient {
    query(queryTextOrConfig: string | pg.QueryConfig): Promise<pg.QueryResult>;
}
