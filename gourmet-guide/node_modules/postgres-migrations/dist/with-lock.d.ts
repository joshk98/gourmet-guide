import { Logger, BasicPgClient } from "./types";
export declare function withAdvisoryLock<T>(log: Logger, f: (client: BasicPgClient) => Promise<T>): (client: BasicPgClient) => Promise<T>;
