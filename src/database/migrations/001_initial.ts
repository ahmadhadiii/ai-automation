import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);

  // Organizations
  await db.schema
    .createTable('organizations')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('name', sql`varchar(255)`, (col) => col.notNull().unique())
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  // Users
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('email', 'varchar', (col) => col.notNull())
    .addColumn('password_hash', 'varchar', (col) => col.notNull())
    .addColumn('first_name', 'varchar', (col) => col.notNull())
    .addColumn('last_name', 'varchar', (col) => col.notNull())
    .addColumn('role', 'varchar', (col) => col.notNull().defaultTo('Member'))
    .addColumn('is_active', 'boolean', (col) =>
      col.notNull().defaultTo(true),
    )
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_users_tenant',
      ['tenant_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_users_org',
      ['organization_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await sql`ALTER TABLE users ADD CONSTRAINT chk_users_role CHECK (role IN ('Admin', 'ProjectManager', 'Member'))`.execute(db);
  await sql`ALTER TABLE users ADD CONSTRAINT uq_users_tenant_email UNIQUE (tenant_id, email)`.execute(db);

  // Projects
  await db.schema
    .createTable('projects')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('description', 'varchar')
    .addColumn('deadline', 'varchar')
    .addColumn('status', 'varchar', (col) => col.notNull().defaultTo('Active'))
    .addColumn('created_by', 'uuid', (col) => col.notNull())
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_projects_tenant',
      ['tenant_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
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
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await sql`ALTER TABLE projects ADD CONSTRAINT chk_projects_status CHECK (status IN ('Active', 'Archived'))`.execute(db);
  await sql`ALTER TABLE projects ADD CONSTRAINT uq_projects_tenant_name UNIQUE (tenant_id, name)`.execute(db);

  // Tasks
  await db.schema
    .createTable('tasks')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('project_id', 'uuid', (col) => col.notNull())
    .addColumn('assignee_id', 'uuid')
    .addColumn('title', 'varchar', (col) => col.notNull())
    .addColumn('description', 'varchar')
    .addColumn('status', 'varchar', (col) => col.notNull().defaultTo('ToDo'))
    .addColumn('priority', 'varchar')
    .addColumn('due_date', 'varchar')
    .addColumn('created_by', 'uuid', (col) => col.notNull())
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_tasks_tenant',
      ['tenant_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_tasks_project',
      ['project_id'],
      'projects',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_tasks_assignee',
      ['assignee_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('set null'),
    )
    .addForeignKeyConstraint(
      'fk_tasks_created_by',
      ['created_by'],
      'users',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await sql`ALTER TABLE tasks ADD CONSTRAINT chk_tasks_status CHECK (status IN ('ToDo', 'InProgress', 'Completed'))`.execute(db);

  // Comments
  await db.schema
    .createTable('comments')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('task_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('content', 'varchar', (col) => col.notNull())
    .addColumn('created_at', sql`timestamptz`, (col) =>
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
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_comments_tenant',
      ['tenant_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  // Attachments
  await db.schema
    .createTable('attachments')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('task_id', 'uuid', (col) => col.notNull())
    .addColumn('uploaded_by', 'uuid')
    .addColumn('file_name', 'varchar', (col) => col.notNull())
    .addColumn('file_path', 'varchar', (col) => col.notNull())
    .addColumn('file_size', 'integer', (col) => col.notNull())
    .addColumn('created_at', sql`timestamptz`, (col) =>
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
      (cb) => cb.onDelete('set null'),
    )
    .addForeignKeyConstraint(
      'fk_attachments_tenant',
      ['tenant_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  // Notifications
  await db.schema
    .createTable('notifications')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('type', 'varchar', (col) => col.notNull())
    .addColumn('message', 'varchar', (col) => col.notNull())
    .addColumn('read', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('entity_type', 'varchar')
    .addColumn('entity_id', 'uuid')
    .addColumn('created_at', sql`timestamptz`, (col) =>
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
      'fk_notifications_tenant',
      ['tenant_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  // Audit Logs
  await db.schema
    .createTable('audit_logs')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid')
    .addColumn('action', 'varchar', (col) => col.notNull())
    .addColumn('entity_type', 'varchar', (col) => col.notNull())
    .addColumn('entity_id', 'uuid')
    .addColumn('metadata', 'jsonb')
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_audit_logs_org',
      ['organization_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_audit_logs_tenant',
      ['tenant_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_audit_logs_user',
      ['user_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('set null'),
    )
    .execute();

  // Project Members
  await db.schema
    .createTable('project_members')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('project_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('role', 'varchar', (col) => col.notNull().defaultTo('Member'))
    .addColumn('created_at', sql`timestamptz`, (col) =>
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

  await sql`ALTER TABLE project_members ADD CONSTRAINT uq_project_members UNIQUE (project_id, user_id)`.execute(db);

  // Refresh Tokens
  await db.schema
    .createTable('refresh_tokens')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('token', 'varchar', (col) => col.notNull())
    .addColumn('expires_at', sql`timestamptz`, (col) => col.notNull())
    .addColumn('created_at', sql`timestamptz`, (col) =>
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

  // Indexes
  await db.schema
    .createIndex('idx_users_tenant_id')
    .on('users')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_projects_tenant_id')
    .on('projects')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_projects_tenant_status')
    .on('projects')
    .columns(['tenant_id', 'status'])
    .execute();

  await db.schema
    .createIndex('idx_tasks_tenant_id')
    .on('tasks')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_tasks_project_id')
    .on('tasks')
    .column('project_id')
    .execute();

  await db.schema
    .createIndex('idx_tasks_assignee_id')
    .on('tasks')
    .column('assignee_id')
    .execute();

  await db.schema
    .createIndex('idx_tasks_status')
    .on('tasks')
    .column('status')
    .execute();

  await db.schema
    .createIndex('idx_users_email')
    .on('users')
    .column('email')
    .execute();

  await db.schema
    .createIndex('idx_comments_tenant_id')
    .on('comments')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_comments_task_id')
    .on('comments')
    .column('task_id')
    .execute();

  await db.schema
    .createIndex('idx_attachments_tenant_id')
    .on('attachments')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_attachments_task_id')
    .on('attachments')
    .column('task_id')
    .execute();

  await db.schema
    .createIndex('idx_notifications_tenant_id')
    .on('notifications')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_notifications_user_id')
    .on('notifications')
    .column('user_id')
    .execute();

  await db.schema
    .createIndex('idx_audit_logs_tenant_id')
    .on('audit_logs')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_project_members_tenant')
    .on('project_members')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_project_members_project')
    .on('project_members')
    .column('project_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('refresh_tokens').execute();
  await db.schema.dropTable('audit_logs').execute();
  await db.schema.dropTable('notifications').execute();
  await db.schema.dropTable('attachments').execute();
  await db.schema.dropTable('comments').execute();
  await db.schema.dropTable('tasks').execute();
  await db.schema.dropTable('project_members').execute();
  await db.schema.dropTable('projects').execute();
  await db.schema.dropTable('users').execute();
  await db.schema.dropTable('organizations').execute();
}
