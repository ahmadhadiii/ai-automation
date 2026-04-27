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
    .addUniqueConstraint('uq_users_tenant_email', ['tenant_id', 'email'])
    .addForeignKeyConstraint(
      'fk_users_org',
      ['organization_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await sql`ALTER TABLE users ADD CONSTRAINT chk_users_role CHECK (role IN ('Admin', 'ProjectManager', 'Member'))`.execute(db);

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
    .addUniqueConstraint('uq_projects_tenant_name', ['tenant_id', 'name'])
    .execute();

  await sql`ALTER TABLE projects ADD CONSTRAINT chk_projects_status CHECK (status IN ('Active', 'Archived'))`.execute(db);

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
    .addColumn('updated_at', sql`timestamptz`, (col) =>
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
    .execute();

  // Attachments
  await db.schema
    .createTable('attachments')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('task_id', 'uuid', (col) => col.notNull())
    .addColumn('uploaded_by', 'uuid', (col) => col.notNull())
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
      'fk_audit_logs_user',
      ['user_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('set null'),
    )
    .execute();

  // Refresh Tokens
  await db.schema
    .createTable('refresh_tokens')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('token_hash', 'varchar', (col) => col.notNull())
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

  // Departments
  await db.schema
    .createTable('departments')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('name', sql`varchar(255)`, (col) => col.notNull())
    .addColumn('description', 'varchar')
    .addColumn('manager_id', 'uuid')
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_departments_org',
      ['organization_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_departments_manager',
      ['manager_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('set null'),
    )
    .addUniqueConstraint('uq_departments_tenant_name', ['tenant_id', 'name'])
    .execute();

  // Employees
  await db.schema
    .createTable('employees')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('department_id', 'uuid')
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('employee_number', 'varchar', (col) => col.notNull())
    .addColumn('position', 'varchar', (col) => col.notNull())
    .addColumn('hire_date', 'varchar', (col) => col.notNull())
    .addColumn('salary', 'numeric')
    .addColumn('status', 'varchar', (col) => col.notNull().defaultTo('Active'))
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_employees_org',
      ['organization_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_employees_department',
      ['department_id'],
      'departments',
      ['id'],
      (cb) => cb.onDelete('set null'),
    )
    .addForeignKeyConstraint(
      'fk_employees_user',
      ['user_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addUniqueConstraint('uq_employees_tenant_number', [
      'tenant_id',
      'employee_number',
    ])
    .execute();

  await sql`ALTER TABLE employees ADD CONSTRAINT chk_employees_status CHECK (status IN ('Active', 'Inactive', 'Terminated'))`.execute(db);

  // Attendance
  await db.schema
    .createTable('attendance')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('employee_id', 'uuid', (col) => col.notNull())
    .addColumn('date', 'varchar', (col) => col.notNull())
    .addColumn('check_in', 'varchar')
    .addColumn('check_out', 'varchar')
    .addColumn('status', 'varchar', (col) => col.notNull().defaultTo('Present'))
    .addColumn('notes', 'varchar')
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_attendance_employee',
      ['employee_id'],
      'employees',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addUniqueConstraint('uq_attendance_tenant_employee_date', [
      'tenant_id',
      'employee_id',
      'date',
    ])
    .execute();

  await sql`ALTER TABLE attendance ADD CONSTRAINT chk_attendance_status CHECK (status IN ('Present', 'Absent', 'Late', 'HalfDay'))`.execute(db);

  // Leave Balances
  await db.schema
    .createTable('leave_balances')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('employee_id', 'uuid', (col) => col.notNull())
    .addColumn('leave_type', 'varchar', (col) => col.notNull())
    .addColumn('total_days', 'numeric', (col) => col.notNull().defaultTo(0))
    .addColumn('used_days', 'numeric', (col) => col.notNull().defaultTo(0))
    .addColumn('remaining_days', 'numeric', (col) =>
      col.notNull().defaultTo(0),
    )
    .addColumn('year', 'integer', (col) => col.notNull())
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_leave_balances_employee',
      ['employee_id'],
      'employees',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addUniqueConstraint('uq_leave_balances_tenant_employee_type', [
      'tenant_id',
      'employee_id',
      'leave_type',
    ])
    .execute();

  // Leave Requests
  await db.schema
    .createTable('leave_requests')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('employee_id', 'uuid', (col) => col.notNull())
    .addColumn('leave_type', 'varchar', (col) => col.notNull())
    .addColumn('start_date', 'varchar', (col) => col.notNull())
    .addColumn('end_date', 'varchar', (col) => col.notNull())
    .addColumn('days', 'numeric', (col) => col.notNull())
    .addColumn('reason', 'varchar')
    .addColumn('status', 'varchar', (col) =>
      col.notNull().defaultTo('Pending'),
    )
    .addColumn('approved_by', 'uuid')
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_leave_requests_employee',
      ['employee_id'],
      'employees',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_leave_requests_approved_by',
      ['approved_by'],
      'users',
      ['id'],
      (cb) => cb.onDelete('set null'),
    )
    .execute();

  await sql`ALTER TABLE leave_requests ADD CONSTRAINT chk_leave_requests_status CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Cancelled'))`.execute(db);

  // Payroll
  await db.schema
    .createTable('payroll')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('employee_id', 'uuid', (col) => col.notNull())
    .addColumn('period_start', 'varchar', (col) => col.notNull())
    .addColumn('period_end', 'varchar', (col) => col.notNull())
    .addColumn('base_salary', 'numeric', (col) => col.notNull())
    .addColumn('deductions', 'numeric', (col) => col.notNull().defaultTo(0))
    .addColumn('net_salary', 'numeric', (col) => col.notNull())
    .addColumn('status', 'varchar', (col) =>
      col.notNull().defaultTo('Pending'),
    )
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_payroll_employee',
      ['employee_id'],
      'employees',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await sql`ALTER TABLE payroll ADD CONSTRAINT chk_payroll_status CHECK (status IN ('Pending', 'Processed', 'Paid'))`.execute(db);

  // Review Cycles
  await db.schema
    .createTable('review_cycles')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('name', sql`varchar(255)`, (col) => col.notNull())
    .addColumn('start_date', 'varchar', (col) => col.notNull())
    .addColumn('end_date', 'varchar', (col) => col.notNull())
    .addColumn('status', 'varchar', (col) =>
      col.notNull().defaultTo('Draft'),
    )
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_review_cycles_org',
      ['organization_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await sql`ALTER TABLE review_cycles ADD CONSTRAINT chk_review_cycles_status CHECK (status IN ('Draft', 'Active', 'Completed'))`.execute(db);

  // Reviews
  await db.schema
    .createTable('reviews')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('review_cycle_id', 'uuid', (col) => col.notNull())
    .addColumn('employee_id', 'uuid', (col) => col.notNull())
    .addColumn('reviewer_id', 'uuid', (col) => col.notNull())
    .addColumn('rating', 'integer')
    .addColumn('comments', 'varchar')
    .addColumn('status', 'varchar', (col) =>
      col.notNull().defaultTo('Pending'),
    )
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_reviews_cycle',
      ['review_cycle_id'],
      'review_cycles',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_reviews_employee',
      ['employee_id'],
      'employees',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_reviews_reviewer',
      ['reviewer_id'],
      'users',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await sql`ALTER TABLE reviews ADD CONSTRAINT chk_reviews_status CHECK (status IN ('Pending', 'InProgress', 'Completed'))`.execute(db);
  await sql`ALTER TABLE reviews ADD CONSTRAINT chk_reviews_rating CHECK (rating >= 1 AND rating <= 5)`.execute(db);

  // Documents
  await db.schema
    .createTable('documents')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('uploaded_by', 'uuid', (col) => col.notNull())
    .addColumn('employee_id', 'uuid')
    .addColumn('name', sql`varchar(255)`, (col) => col.notNull())
    .addColumn('file_path', 'varchar', (col) => col.notNull())
    .addColumn('file_size', 'integer', (col) => col.notNull())
    .addColumn('document_type', 'varchar')
    .addColumn('created_at', sql`timestamptz`, (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addForeignKeyConstraint(
      'fk_documents_uploaded_by',
      ['uploaded_by'],
      'users',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_documents_employee',
      ['employee_id'],
      'employees',
      ['id'],
      (cb) => cb.onDelete('set null'),
    )
    .execute();

  // Announcements
  await db.schema
    .createTable('announcements')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('tenant_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.notNull())
    .addColumn('title', sql`varchar(255)`, (col) => col.notNull())
    .addColumn('content', 'varchar', (col) => col.notNull())
    .addColumn('published_by', 'uuid', (col) => col.notNull())
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
      'fk_announcements_org',
      ['organization_id'],
      'organizations',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'fk_announcements_published_by',
      ['published_by'],
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
    .createIndex('idx_users_email')
    .on('users')
    .column('email')
    .execute();

  await db.schema
    .createIndex('idx_projects_tenant_id')
    .on('projects')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_projects_status')
    .on('projects')
    .column('status')
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
    .createIndex('idx_comments_task_id')
    .on('comments')
    .column('task_id')
    .execute();

  await db.schema
    .createIndex('idx_comments_tenant_id')
    .on('comments')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_attachments_task_id')
    .on('attachments')
    .column('task_id')
    .execute();

  await db.schema
    .createIndex('idx_notifications_user_id')
    .on('notifications')
    .column('user_id')
    .execute();

  await sql`CREATE INDEX idx_audit_logs_tenant_created ON audit_logs (tenant_id, created_at DESC)`.execute(db);

  await db.schema
    .createIndex('idx_refresh_tokens_user_id')
    .on('refresh_tokens')
    .column('user_id')
    .execute();

  await db.schema
    .createIndex('idx_departments_tenant_id')
    .on('departments')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_employees_tenant_id')
    .on('employees')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_employees_department_id')
    .on('employees')
    .column('department_id')
    .execute();

  await db.schema
    .createIndex('idx_attendance_tenant_id')
    .on('attendance')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_attendance_employee_id')
    .on('attendance')
    .column('employee_id')
    .execute();

  await db.schema
    .createIndex('idx_leave_balances_employee_id')
    .on('leave_balances')
    .column('employee_id')
    .execute();

  await db.schema
    .createIndex('idx_leave_requests_employee_id')
    .on('leave_requests')
    .column('employee_id')
    .execute();

  await db.schema
    .createIndex('idx_leave_requests_tenant_id')
    .on('leave_requests')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_payroll_employee_id')
    .on('payroll')
    .column('employee_id')
    .execute();

  await db.schema
    .createIndex('idx_payroll_tenant_id')
    .on('payroll')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_review_cycles_tenant_id')
    .on('review_cycles')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_reviews_tenant_id')
    .on('reviews')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_reviews_employee_id')
    .on('reviews')
    .column('employee_id')
    .execute();

  await db.schema
    .createIndex('idx_documents_tenant_id')
    .on('documents')
    .column('tenant_id')
    .execute();

  await db.schema
    .createIndex('idx_announcements_tenant_id')
    .on('announcements')
    .column('tenant_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('announcements').execute();
  await db.schema.dropTable('documents').execute();
  await db.schema.dropTable('reviews').execute();
  await db.schema.dropTable('review_cycles').execute();
  await db.schema.dropTable('payroll').execute();
  await db.schema.dropTable('leave_requests').execute();
  await db.schema.dropTable('leave_balances').execute();
  await db.schema.dropTable('attendance').execute();
  await db.schema.dropTable('employees').execute();
  await db.schema.dropTable('departments').execute();
  await db.schema.dropTable('refresh_tokens').execute();
  await db.schema.dropTable('audit_logs').execute();
  await db.schema.dropTable('notifications').execute();
  await db.schema.dropTable('attachments').execute();
  await db.schema.dropTable('comments').execute();
  await db.schema.dropTable('tasks').execute();
  await db.schema.dropTable('projects').execute();
  await db.schema.dropTable('users').execute();
  await db.schema.dropTable('organizations').execute();
}
