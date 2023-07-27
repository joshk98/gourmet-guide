import { FileType } from "./types";
export interface FileInfo {
    id: number;
    name: string;
    type: FileType;
}
export declare const parseFileName: (fileName: string) => FileInfo;
