"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await (0, kysely_1.sql) `CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(email)`.execute(db);
}
async function down(db) {
    await (0, kysely_1.sql) `DROP INDEX IF EXISTS idx_users_email_unique`.execute(db);
}
//# sourceMappingURL=002_create_users.js.map