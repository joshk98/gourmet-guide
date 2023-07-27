"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigration = void 0;
const sql_template_strings_1 = require("sql-template-strings");
const noop = () => {
    //
};
const insertMigration = async (migrationTableName, client, migration, log) => {
    log(`Saving migration to '${migrationTableName}': ${migration.id} | ${migration.name} | ${migration.hash}`);
    const sql = sql_template_strings_1.default `INSERT INTO `
        .append(migrationTableName)
        .append(sql_template_strings_1.default ` ("id", "name", "hash") VALUES (${migration.id},${migration.name},${migration.hash})`);
    return client.query(sql);
};
const runMigration = (migrationTableName, client, log = noop) => async (migration) => {
    const inTransaction = migration.sql.includes("-- postgres-migrations disable-transaction") ===
        false;
    log(`Running migration in transaction: ${inTransaction}`);
    const begin = inTransaction ? () => client.query("START TRANSACTION") : noop;
    const end = inTransaction ? () => client.query("COMMIT") : noop;
    const cleanup = inTransaction ? () => client.query("ROLLBACK") : noop;
    try {
        await begin();
        await client.query(migration.sql);
        await insertMigration(migrationTableName, client, migration, log);
        await end();
        return migration;
    }
    catch (err) {
        try {
            await cleanup();
        }
        catch (_a) {
            //
        }
        throw new Error(`An error occurred running '${migration.name}'. Rolled back this migration. No further migrations were run. Reason: ${err.message}`);
    }
};
exports.runMigration = runMigration;
