import { Generated } from 'kysely';

export interface Database {
  users: UsersTable;
  refresh_tokens: RefreshTokensTable;
  projects: ProjectsTable;
  tasks: TasksTable;
  comments: CommentsTable;
  attachments: AttachmentsTable;
  notifications: NotificationsTable;
  audit_logs: AuditLogsTable;
}

export interface UsersTable {
  id: Generated<string>;
  tenant_id: string;
  email: string;
  password_hash: string;
  role: string;
  is_active: Generated<boolean>;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface RefreshTokensTable {
  id: Generated<string>;
  tenant_id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  created_at: Generated<Date>;
}

export interface ProjectsTable {
  id: Generated<string>;
  tenant_id: string;
  name: string;
  description: string | null;
  owner_id: string;
  status: string;
  created_at: Generated<Date>;
}

export interface TasksTable {
  id: Generated<string>;
  tenant_id: string;
  project_id: string;
  title: string;
  description: string | null;
  assignee_id: string | null;
  status: string;
  due_date: string | null;
  created_at: Generated<Date>;
}

export interface CommentsTable {
  id: Generated<string>;
  tenant_id: string;
  task_id: string;
  author_id: string;
  content: string;
  created_at: Generated<Date>;
}

export interface AttachmentsTable {
  id: Generated<string>;
  tenant_id: string;
  task_id: string;
  file_name: string;
  file_url: string;
  uploaded_by: string;
  uploaded_at: Generated<Date>;
}

export interface NotificationsTable {
  id: Generated<string>;
  tenant_id: string;
  user_id: string;
  message: string;
  read: Generated<boolean>;
  created_at: Generated<Date>;
}

export interface AuditLogsTable {
  id: Generated<string>;
  tenant_id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: Generated<Date>;
}
