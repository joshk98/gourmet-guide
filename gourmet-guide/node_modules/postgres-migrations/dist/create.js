"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCreateQuery = exports.createDb = void 0;
const pg = require("pg");
const with_connection_1 = require("./with-connection");
const DUPLICATE_DATABASE = "42P04";
/**
 * @deprecated Use `migrate` instead with `ensureDatabaseExists: true`.
 */
async function createDb(dbName, dbConfig, config = {}) {
    if (typeof dbName !== "string") {
        throw new Error("Must pass database name as a string");
    }
    const log = config.logger != null
        ? config.logger
        : () => {
            //
        };
    if (dbConfig == null) {
        throw new Error("No config object");
    }
    if ("client" in dbConfig) {
        return runCreateQuery(dbName, log)(dbConfig.client);
    }
    if (typeof dbConfig.user !== "string" ||
        typeof dbConfig.password !== "string" ||
        typeof dbConfig.host !== "string" ||
        typeof dbConfig.port !== "number") {
        throw new Error("Database config problem");
    }
    const { user, password, host, port } = dbConfig;
    const client = new pg.Client({
        database: dbConfig.defaultDatabase != null ? dbConfig.defaultDatabase : "postgres",
        user,
        password,
        host,
        port,
    });
    client.on("error", (err) => {
        log(`pg client emitted an error: ${err.message}`);
    });
    const runWith = with_connection_1.withConnection(log, runCreateQuery(dbName, log));
    return runWith(client);
}
exports.createDb = createDb;
function runCreateQuery(dbName, log) {
    return async (client) => {
        await client
            .query(`CREATE DATABASE "${dbName.replace(/\"/g, '""')}"`)
            .catch((e) => {
            switch (e.code) {
                case DUPLICATE_DATABASE: {
                    log(`'${dbName}' database already exists`);
                    return;
                }
                default: {
                    log(e);
                    throw new Error(`Error creating database. Caused by: '${e.name}: ${e.message}'`);
                }
            }
        });
    };
}
exports.runCreateQuery = runCreateQuery;
