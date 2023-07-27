import { Logger, Migration } from "./types";
/**
 * Load the migration files and assert they are reasonably valid.
 *
 * 'Reasonably valid' in this case means obeying the file name and
 * consecutive ordering rules.
 *
 * No assertions are made about the validity of the SQL.
 */
export declare const loadMigrationFiles: (directory: string, log?: Logger) => Promise<Array<Migration>>;
