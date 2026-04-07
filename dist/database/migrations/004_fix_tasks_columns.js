"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .alterTable('tasks')
        .renameColumn('assigned_to', 'assignee_id')
        .execute();
    await db.schema
        .alterTable('tasks')
        .addColumn('created_by', 'uuid', (col) => col.notNull().defaultTo((0, kysely_1.sql) `'00000000-0000-0000-0000-000000000000'`))
        .execute();
    await db.schema
        .alterTable('tasks')
        .addForeignKeyConstraint('fk_tasks_created_by', ['created_by'], 'users', ['id'])
        .execute();
}
async function down(db) {
    await db.schema
        .alterTable('tasks')
        .dropConstraint('fk_tasks_created_by')
        .execute();
    await db.schema
        .alterTable('tasks')
        .dropColumn('created_by')
        .execute();
    await db.schema
        .alterTable('tasks')
        .renameColumn('assignee_id', 'assigned_to')
        .execute();
}
//# sourceMappingURL=004_fix_tasks_columns.js.map