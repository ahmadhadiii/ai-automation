"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .alterTable('users')
        .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .execute();
    await (0, kysely_1.sql) `ALTER TABLE users ADD CONSTRAINT chk_users_role CHECK (role IN ('ADMIN','MEMBER'))`.execute(db);
    await (0, kysely_1.sql) `CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email)`.execute(db);
}
async function down(db) {
    await (0, kysely_1.sql) `DROP INDEX IF EXISTS idx_users_email`.execute(db);
    await (0, kysely_1.sql) `ALTER TABLE users DROP CONSTRAINT IF EXISTS chk_users_role`.execute(db);
    await db.schema.alterTable('users').dropColumn('updated_at').execute();
}
//# sourceMappingURL=001_init_users.js.map