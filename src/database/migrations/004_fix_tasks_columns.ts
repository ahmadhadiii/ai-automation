import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('tasks')
    .renameColumn('assigned_to', 'assignee_id')
    .execute();

  await db.schema
    .alterTable('tasks')
    .addColumn('created_by', 'uuid', (col) => col.notNull().defaultTo(sql`'00000000-0000-0000-0000-000000000000'`))
    .execute();

  await db.schema
    .alterTable('tasks')
    .addForeignKeyConstraint(
      'fk_tasks_created_by',
      ['created_by'],
      'users',
      ['id'],
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
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
