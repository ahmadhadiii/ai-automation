"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kyselyProvider = exports.KYSELY = void 0;
const kysely_1 = require("kysely");
const pg_1 = require("pg");
exports.KYSELY = 'KYSELY';
exports.kyselyProvider = {
    provide: exports.KYSELY,
    useFactory: () => {
        return new kysely_1.Kysely({
            dialect: new kysely_1.PostgresDialect({
                pool: new pg_1.Pool({
                    host: process.env.DB_HOST || 'localhost',
                    port: parseInt(process.env.DB_PORT || '5432', 10),
                    user: process.env.DB_USER || 'postgres',
                    password: process.env.DB_PASSWORD || 'postgres',
                    database: process.env.DB_NAME || 'task_management',
                }),
            }),
        });
    },
};
//# sourceMappingURL=kysely.provider.js.map