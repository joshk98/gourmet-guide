import { Config, MigrateDBConfig, Migration } from "./types";
/**
 * Run the migrations.
 *
 * If `dbConfig.ensureDatabaseExists` is true then `dbConfig.database` will be created if it
 * does not exist.
 *
 * @param dbConfig Details about how to connect to the database
 * @param migrationsDirectory Directory containing the SQL migration files
 * @param config Extra configuration
 * @returns Details about the migrations which were run
 */
export declare function migrate(dbConfig: MigrateDBConfig, migrationsDirectory: string, config?: Config): Promise<Array<Migration>>;
