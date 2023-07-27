"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = void 0;
const pg = require("pg");
const sql_template_strings_1 = require("sql-template-strings");
const create_1 = require("./create");
const files_loader_1 = require("./files-loader");
const run_migration_1 = require("./run-migration");
const validation_1 = require("./validation");
const with_connection_1 = require("./with-connection");
const with_lock_1 = require("./with-lock");
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
async function migrate(dbConfig, migrationsDirectory, config = {}) {
    const log = config.logger != null
        ? config.logger
        : () => {
            //
        };
    if (dbConfig == null) {
        throw new Error("No config object");
    }
    if (typeof migrationsDirectory !== "string") {
        throw new Error("Must pass migrations directory as a string");
    }
    const intendedMigrations = await files_loader_1.loadMigrationFiles(migrationsDirectory, log);
    if ("client" in dbConfig) {
        // we have been given a client to use, it should already be connected
        return with_lock_1.withAdvisoryLock(log, runMigrations(intendedMigrations, log))(dbConfig.client);
    }
    if (typeof dbConfig.database !== "string" ||
        typeof dbConfig.user !== "string" ||
        typeof dbConfig.password !== "string" ||
        typeof dbConfig.host !== "string" ||
        typeof dbConfig.port !== "number") {
        throw new Error("Database config problem");
    }
    if (dbConfig.ensureDatabaseExists === true) {
        // Check whether database exists
        const { user, password, host, port } = dbConfig;
        const client = new pg.Client({
            database: dbConfig.defaultDatabase != null
                ? dbConfig.defaultDatabase
                : "postgres",
            user,
            password,
            host,
            port,
        });
        const runWith = with_connection_1.withConnection(log, async (connectedClient) => {
            const result = await connectedClient.query({
                text: "SELECT 1 FROM pg_database WHERE datname=$1",
                values: [dbConfig.database],
            });
            if (result.rowCount !== 1) {
                await create_1.runCreateQuery(dbConfig.database, log)(connectedClient);
            }
        });
        await runWith(client);
    }
    {
        const client = new pg.Client(dbConfig);
        client.on("error", (err) => {
            log(`pg client emitted an error: ${err.message}`);
        });
        const runWith = with_connection_1.withConnection(log, with_lock_1.withAdvisoryLock(log, runMigrations(intendedMigrations, log)));
        return runWith(client);
    }
}
exports.migrate = migrate;
function runMigrations(intendedMigrations, log) {
    return async (client) => {
        try {
            const migrationTableName = "migrations";
            log("Starting migrations");
            const appliedMigrations = await fetchAppliedMigrationFromDB(migrationTableName, client, log);
            validation_1.validateMigrationHashes(intendedMigrations, appliedMigrations);
            const migrationsToRun = filterMigrations(intendedMigrations, appliedMigrations);
            const completedMigrations = [];
            for (const migration of migrationsToRun) {
                log(`Starting migration: ${migration.id} ${migration.name}`);
                const result = await run_migration_1.runMigration(migrationTableName, client, log)(migration);
                log(`Finished migration: ${migration.id} ${migration.name}`);
                completedMigrations.push(result);
            }
            logResult(completedMigrations, log);
            log("Finished migrations");
            return completedMigrations;
        }
        catch (e) {
            const error = new Error(`Migration failed. Reason: ${e.message}`);
            error.cause = e;
            throw error;
        }
    };
}
/** Queries the database for migrations table and retrieve it rows if exists */
async function fetchAppliedMigrationFromDB(migrationTableName, client, log) {
    let appliedMigrations = [];
    if (await doesTableExist(client, migrationTableName)) {
        log(`Migrations table with name '${migrationTableName}' exists, filtering not applied migrations.`);
        const { rows } = await client.query(`SELECT * FROM ${migrationTableName} ORDER BY id`);
        appliedMigrations = rows;
    }
    else {
        log(`Migrations table with name '${migrationTableName}' hasn't been created,
so the database is new and we need to run all migrations.`);
    }
    return appliedMigrations;
}
/** Work out which migrations to apply */
function filterMigrations(migrations, appliedMigrations) {
    const notAppliedMigration = (migration) => !appliedMigrations[migration.id];
    return migrations.filter(notAppliedMigration);
}
/** Logs the result */
function logResult(completedMigrations, log) {
    if (completedMigrations.length === 0) {
        log("No migrations applied");
    }
    else {
        log(`Successfully applied migrations: ${completedMigrations.map(({ name }) => name)}`);
    }
}
/** Check whether table exists in postgres - http://stackoverflow.com/a/24089729 */
async function doesTableExist(client, tableName) {
    const result = await client.query(sql_template_strings_1.default `SELECT EXISTS (
  SELECT 1
  FROM   pg_catalog.pg_class c
  WHERE  c.relname = ${tableName}
  AND    c.relkind = 'r'
);`);
    return result.rows.length > 0 && result.rows[0].exists;
}
