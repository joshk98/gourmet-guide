"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMigrationFile = void 0;
const util_1 = require("util");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const load_sql_from_js_1 = require("./load-sql-from-js");
const file_name_parser_1 = require("./file-name-parser");
const readFile = util_1.promisify(fs.readFile);
const getFileName = (filePath) => path.basename(filePath);
const getFileContents = async (filePath) => readFile(filePath, "utf8");
const hashString = (s) => crypto.createHash("sha1").update(s, "utf8").digest("hex");
const getSqlStringLiteral = (filePath, contents, type) => {
    switch (type) {
        case "sql":
            return contents;
        case "js":
            return load_sql_from_js_1.loadSqlFromJs(filePath);
        default: {
            const exhaustiveCheck = type;
            return exhaustiveCheck;
        }
    }
};
const loadMigrationFile = async (filePath) => {
    const fileName = getFileName(filePath);
    try {
        const { id, name, type } = file_name_parser_1.parseFileName(fileName);
        const contents = await getFileContents(filePath);
        const sql = getSqlStringLiteral(filePath, contents, type);
        const hash = hashString(fileName + sql);
        return {
            id,
            name,
            contents,
            fileName,
            hash,
            sql,
        };
    }
    catch (err) {
        throw new Error(`${err.message} - Offending file: '${fileName}'.`);
    }
};
exports.loadMigrationFile = loadMigrationFile;
