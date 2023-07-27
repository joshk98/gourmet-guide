import * as pg from "pg";
import { Logger, BasicPgClient } from "./types";
export declare function withConnection<T>(log: Logger, f: (client: BasicPgClient) => Promise<T>): (client: pg.Client) => Promise<T>;
