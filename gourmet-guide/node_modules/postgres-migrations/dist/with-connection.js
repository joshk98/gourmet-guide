"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withConnection = void 0;
function withConnection(log, f) {
    return async (client) => {
        try {
            try {
                log("Connecting to database...");
                await client.connect();
                log("... connected to database");
            }
            catch (e) {
                log(`Error connecting to database: ${e.message}`);
                throw e;
            }
            const result = await f(client);
            return result;
        }
        catch (e) {
            log(`Error using connection: ${e.message}`);
            throw e;
        }
        finally {
            // always try to close the connection
            try {
                log("Closing connection...");
                await client.end();
                log("... connection closed");
            }
            catch (e) {
                log(`Error closing the connection: ${e.message}`);
            }
        }
    };
}
exports.withConnection = withConnection;
