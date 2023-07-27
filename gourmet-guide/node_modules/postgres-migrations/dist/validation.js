"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMigrationHashes = exports.validateMigrationOrdering = void 0;
const indexNotMatch = (migration, index) => migration.id !== index;
/** Assert migration IDs are consecutive integers */
function validateMigrationOrdering(migrations) {
    const notMatchingId = migrations.find(indexNotMatch);
    if (notMatchingId) {
        throw new Error(`Found a non-consecutive migration ID on file: '${notMatchingId.fileName}'`);
    }
}
exports.validateMigrationOrdering = validateMigrationOrdering;
/** Assert hashes match */
function validateMigrationHashes(migrations, appliedMigrations) {
    const invalidHash = (migration) => {
        const appliedMigration = appliedMigrations[migration.id];
        return appliedMigration != null && appliedMigration.hash !== migration.hash;
    };
    // Assert migration hashes are still same
    const invalidHashes = migrations.filter(invalidHash);
    if (invalidHashes.length > 0) {
        // Someone has altered one or more migrations which has already run - gasp!
        const invalidFiles = invalidHashes.map(({ fileName }) => fileName);
        throw new Error(`Hashes don't match for migrations '${invalidFiles}'.
This means that the scripts have changed since it was applied.`);
    }
}
exports.validateMigrationHashes = validateMigrationHashes;
