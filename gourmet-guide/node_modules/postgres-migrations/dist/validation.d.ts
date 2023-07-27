import { Migration } from "./types";
/** Assert migration IDs are consecutive integers */
export declare function validateMigrationOrdering(migrations: Array<Migration>): void;
/** Assert hashes match */
export declare function validateMigrationHashes(migrations: Array<Migration>, appliedMigrations: Record<number, Migration | undefined>): void;
