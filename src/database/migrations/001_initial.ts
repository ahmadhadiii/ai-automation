import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('email', 'varchar', (col) => col.notNull().unique())
    .addColumn('password_hash', 'varchar', (col) => col.notNull())
    .addColumn('first_name', 'varchar')
    .addColumn('last_name', 'varchar')
    .addColumn('role', 'varchar', (col) => col.notNull().defaultTo('Member'))
    .addColumn('is_active', 'boolean', (col) =>
      col.notNull().defaultTo(true),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createTable('organizations')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createTable('organization_members')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('role', 'varchar', (col) => col.notNull())
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_org_members_org',
      ['organization_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_org_members_user',
      ['user_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addUniqueConstraint('org_user_unique', ['organization_id', 'user_id'])
    .execute();

  await db.schema
    .createTable('projects')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('description', 'varchar')
    .addColumn('status', 'varchar', (col) => col.notNull().defaultTo('Active'))
    .addColumn('created_by', 'uuid', (col) => col.notNull())
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_projects_org',
      ['organization_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_projects_created_by',
      ['created_by'],
      'users',
      ['id'],
    )
    .execute();

  await db.schema
    .createTable('tasks')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('project_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('title', 'varchar', (col) => col.notNull())
    .addColumn('description', 'varchar')
    .addColumn('status', 'varchar', (col) => col.notNull().defaultTo('ToDo'))
    .addColumn('assigned_to', 'uuid')
    .addColumn('due_date', 'timestamp')
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_tasks_project',
      ['project_id'],
      'projects',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_tasks_org',
      ['organization_id'],
      'organizations',
      ['id'],
    )
    .addForeignKeyConstraint(
      'fk_tasks_assigned_to',
      ['assigned_to'],
      'users',
      ['id'],
    )
    .execute();

  await db.schema
    .createTable('comments')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('task_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('content', 'varchar', (col) => col.notNull())
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_comments_task',
      ['task_id'],
      'tasks',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_comments_user',
      ['user_id'],
      'users',
      ['id'],
    )
    .addForeignKeyConstraint(
      'fk_comments_org',
      ['organization_id'],
      'organizations',
      ['id'],
    )
    .execute();

  await db.schema
    .createTable('attachments')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('task_id', 'uuid', (col) => col.notNull())
    .addColumn('uploaded_by', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('file_name', 'varchar', (col) => col.notNull())
    .addColumn('file_url', 'varchar', (col) => col.notNull())
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_attachments_task',
      ['task_id'],
      'tasks',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_attachments_user',
      ['uploaded_by'],
      'users',
      ['id'],
    )
    .addForeignKeyConstraint(
      'fk_attachments_org',
      ['organization_id'],
      'organizations',
      ['id'],
    )
    .execute();

  await db.schema
    .createTable('notifications')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('type', 'varchar', (col) => col.notNull())
    .addColumn('message', 'varchar', (col) => col.notNull())
    .addColumn('is_read', 'boolean', (col) =>
      col.notNull().defaultTo(false),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_notifications_user',
      ['user_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_notifications_org',
      ['organization_id'],
      'organizations',
      ['id'],
    )
    .execute();

  await db.schema
    .createTable('audit_logs')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('action', 'varchar', (col) => col.notNull())
    .addColumn('entity_type', 'varchar', (col) => col.notNull())
    .addColumn('entity_id', 'uuid', (col) => col.notNull())
    .addColumn('metadata', 'jsonb')
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_audit_logs_org',
      ['organization_id'],
      'organizations',
      ['id'],
    )
    .addForeignKeyConstraint(
      'fk_audit_logs_user',
      ['user_id'],
      'users',
      ['id'],
    )
    .execute();

  await db.schema
    .createTable('refresh_tokens')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('token_hash', 'varchar', (col) => col.notNull())
    .addColumn('expires_at', 'timestamp', (col) => col.notNull())
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_refresh_tokens_user',
      ['user_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createTable('project_members')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('project_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('role', 'varchar', (col) => col.notNull())
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_project_members_project',
      ['project_id'],
      'projects',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_project_members_user',
      ['user_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  // Indexes
  await db.schema
    .createIndex('idx_projects_org')
    .on('projects')
    .column('organization_id')
    .execute();

  await db.schema
    .createIndex('idx_tasks_status')
    .on('tasks')
    .column('status')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('project_members').execute();
  await db.schema.dropTable('refresh_tokens').execute();
  await db.schema.dropTable('audit_logs').execute();
  await db.schema.dropTable('notifications').execute();
  await db.schema.dropTable('attachments').execute();
  await db.schema.dropTable('comments').execute();
  await db.schema.dropTable('tasks').execute();
  await db.schema.dropTable('projects').execute();
  await db.schema.dropTable('organization_members').execute();
  await db.schema.dropTable('organizations').execute();
  await db.schema.dropTable('users').execute();
}
