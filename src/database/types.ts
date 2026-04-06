import { Generated } from 'kysely';

export interface Database {
  organizations: OrganizationsTable;
  users: UsersTable;
  projects: ProjectsTable;
  tasks: TasksTable;
  comments: CommentsTable;
  attachments: AttachmentsTable;
  notifications: NotificationsTable;
  audit_logs: AuditLogsTable;
}

export interface NotificationsTable {
  id: Generated<string>;
  tenant_id: string;
  user_id: string;
  message: string;
  read: Generated<boolean>;
  created_at: Generated<Date>;
}

export interface OrganizationsTable {
  id: Generated<string>;
  tenant_id: string;
  name: string;
  created_at: Generated<Date>;
}

export interface UsersTable {
  id: Generated<string>;
  tenant_id: string;
  organization_id: string;
  email: string;
  password_hash: string;
  role: string;
  is_active: Generated<boolean>;
  created_at: Generated<Date>;
}

export interface ProjectsTable {
  id: Generated<string>;
  tenant_id: string;
  organization_id: string;
  name: string;
  deadline: string | null;
  status: string;
  created_by: string;
  created_at: Generated<Date>;
}

export interface TasksTable {
  id: Generated<string>;
  tenant_id: string;
  project_id: string;
  assignee_id: string | null;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  created_by: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface CommentsTable {
  id: Generated<string>;
  tenant_id: string;
  task_id: string;
  user_id: string;
  content: string;
  created_at: Generated<Date>;
}

export interface AttachmentsTable {
  id: Generated<string>;
  tenant_id: string;
  task_id: string;
  uploaded_by: string;
  file_name: string;
  file_path: string;
  file_size: number;
  created_at: Generated<Date>;
}

export interface AuditLogsTable {
  id: Generated<string>;
  tenant_id: string;
  organization_id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: Generated<Date>;
}
