export declare const loadMigrationFile: (filePath: string) => Promise<{
    id: number;
    name: string;
    contents: string;
    fileName: string;
    hash: string;
    sql: string;
}>;
