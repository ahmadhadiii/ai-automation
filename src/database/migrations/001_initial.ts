import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);

  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('email', 'text', (col) => col.notNull().unique())
    .addColumn('password_hash', 'text', (col) => col.notNull())
    .addColumn('role', 'text', (col) => col.notNull())
    .addColumn('is_active', 'boolean', (col) => col.notNull().defaultTo(true))
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createTable('refresh_tokens')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) =>
      col.notNull().references('users.id').onDelete('cascade'),
    )
    .addColumn('token_hash', 'text', (col) => col.notNull())
    .addColumn('expires_at', 'timestamptz', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createTable('projects')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('owner_id', 'uuid', (col) =>
      col.notNull().references('users.id'),
    )
    .addColumn('status', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createTable('tasks')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('project_id', 'uuid', (col) =>
      col.notNull().references('projects.id').onDelete('cascade'),
    )
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('assignee_id', 'uuid', (col) =>
      col.references('users.id'),
    )
    .addColumn('status', 'text', (col) => col.notNull())
    .addColumn('due_date', 'date')
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createTable('comments')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('task_id', 'uuid', (col) =>
      col.notNull().references('tasks.id').onDelete('cascade'),
    )
    .addColumn('author_id', 'uuid', (col) =>
      col.notNull().references('users.id'),
    )
    .addColumn('content', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createTable('attachments')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('task_id', 'uuid', (col) =>
      col.notNull().references('tasks.id').onDelete('cascade'),
    )
    .addColumn('file_name', 'text', (col) => col.notNull())
    .addColumn('file_url', 'text', (col) => col.notNull())
    .addColumn('uploaded_by', 'uuid', (col) =>
      col.notNull().references('users.id'),
    )
    .addColumn('uploaded_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createTable('audit_logs')
    .ifNotExists()
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) =>
      col.references('users.id'),
    )
    .addColumn('action', 'text', (col) => col.notNull())
    .addColumn('entity_type', 'text', (col) => col.notNull())
    .addColumn('entity_id', 'uuid')
    .addColumn('metadata', 'jsonb')
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  // Indexes for tenant isolation
  await sql`CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_refresh_tokens_tenant ON refresh_tokens(tenant_id)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user ON refresh_tokens(user_id)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_projects_tenant ON projects(tenant_id)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_tasks_tenant ON tasks(tenant_id)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks(project_id)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_tasks_assignee ON tasks(assignee_id)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_comments_task ON comments(task_id)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_comments_author ON comments(author_id)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_attachments_task ON attachments(task_id)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant ON audit_logs(tenant_id)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id)`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('audit_logs').ifExists().execute();
  await db.schema.dropTable('attachments').ifExists().execute();
  await db.schema.dropTable('comments').ifExists().execute();
  await db.schema.dropTable('tasks').ifExists().execute();
  await db.schema.dropTable('projects').ifExists().execute();
  await db.schema.dropTable('refresh_tokens').ifExists().execute();
  await db.schema.dropTable('users').ifExists().execute();
}
