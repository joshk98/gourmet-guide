#!/usr/bin/env node
"use strict";
// tslint:disable no-console
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const files_loader_1 = require("../files-loader");
async function main(args) {
    const directory = args[0];
    await files_loader_1.loadMigrationFiles(directory, (x) => console.error(x));
}
main(process_1.argv.slice(2)).catch((e) => {
    console.error(`ERROR: ${e.message}`);
    process.exit(1);
});
