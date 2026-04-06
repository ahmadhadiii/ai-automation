import { Generated, ColumnType } from 'kysely';

export interface Database {
  users: UsersTable;
  projects: ProjectsTable;
  tasks: TasksTable;
  comments: CommentsTable;
  attachments: AttachmentsTable;
  notifications: NotificationsTable;
  audit_logs: AuditLogsTable;
}

export interface UsersTable {
  id: Generated<string>;
  email: string;
  password_hash: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'MEMBER';
  tenant_id: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface ProjectsTable {
  id: Generated<string>;
  name: string;
  description: string | null;
  owner_id: string;
  tenant_id: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface TasksTable {
  id: Generated<string>;
  title: string;
  description: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  project_id: string;
  assignee_id: string | null;
  tenant_id: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface CommentsTable {
  id: Generated<string>;
  body: string;
  task_id: string;
  author_id: string;
  tenant_id: string;
  created_at: Generated<Date>;
}

export interface AttachmentsTable {
  id: Generated<string>;
  filename: string;
  url: string;
  task_id: string;
  uploaded_by: string;
  tenant_id: string;
  created_at: Generated<Date>;
}

export interface NotificationsTable {
  id: Generated<string>;
  user_id: string;
  message: string;
  read: Generated<boolean>;
  tenant_id: string;
  created_at: Generated<Date>;
}

export interface AuditLogsTable {
  id: Generated<string>;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  tenant_id: string;
  created_at: Generated<Date>;
}
