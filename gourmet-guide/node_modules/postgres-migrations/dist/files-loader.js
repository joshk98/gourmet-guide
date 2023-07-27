"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMigrationFiles = void 0;
const fs = require("fs");
const path = require("path");
const util_1 = require("util");
const migration_file_1 = require("./migration-file");
const validation_1 = require("./validation");
const readDir = util_1.promisify(fs.readdir);
const isValidFile = (fileName) => /\.(sql|js)$/gi.test(fileName);
/**
 * Load the migration files and assert they are reasonably valid.
 *
 * 'Reasonably valid' in this case means obeying the file name and
 * consecutive ordering rules.
 *
 * No assertions are made about the validity of the SQL.
 */
const loadMigrationFiles = async (directory, 
// tslint:disable-next-line no-empty
log = () => { }) => {
    log(`Loading migrations from: ${directory}`);
    const fileNames = await readDir(directory);
    log(`Found migration files: ${fileNames}`);
    if (fileNames == null) {
        return [];
    }
    const migrationFiles = [
        path.join(__dirname, "migrations/0_create-migrations-table.sql"),
        ...fileNames.map((fileName) => path.resolve(directory, fileName)),
    ].filter(isValidFile);
    const unorderedMigrations = await Promise.all(migrationFiles.map(migration_file_1.loadMigrationFile));
    // Arrange in ID order
    const orderedMigrations = unorderedMigrations.sort((a, b) => a.id - b.id);
    validation_1.validateMigrationOrdering(orderedMigrations);
    return orderedMigrations;
};
exports.loadMigrationFiles = loadMigrationFiles;
