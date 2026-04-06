import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('refresh_tokens')
    .addColumn('id', 'uuid', (col) => col.primaryKey().notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('token_hash', 'text', (col) => col.notNull())
    .addColumn('expires_at', 'timestamptz', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn('revoked_at', 'timestamptz')
    .addForeignKeyConstraint(
      'refresh_tokens_user_id_fk',
      ['user_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('cascade')
    )
    .execute();

  await db.schema
    .createIndex('refresh_tokens_user_id_idx')
    .on('refresh_tokens')
    .column('user_id')
    .execute();

  await db.schema
    .createIndex('refresh_tokens_expires_at_idx')
    .on('refresh_tokens')
    .column('expires_at')
    .execute();

  await db.schema
    .createIndex('refresh_tokens_token_hash_unique')
    .on('refresh_tokens')
    .column('token_hash')
    .unique()
    .execute();

  await db.schema
    .createTable('project_members')
    .addColumn('id', 'uuid', (col) => col.primaryKey().notNull())
    .addColumn('project_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addForeignKeyConstraint(
      'project_members_project_id_fk',
      ['project_id'],
      'projects',
      ['id'],
      (cb) => cb.onDelete('cascade')
    )
    .addForeignKeyConstraint(
      'project_members_user_id_fk',
      ['user_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('cascade')
    )
    .execute();

  await db.schema
    .createIndex('project_members_user_id_idx')
    .on('project_members')
    .column('user_id')
    .execute();

  await db.schema
    .createIndex('project_members_unique_idx')
    .on('project_members')
    .columns(['project_id', 'user_id'])
    .unique()
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('project_members').execute();
  await db.schema.dropTable('refresh_tokens').execute();
}
