import { Generated } from 'kysely';

export interface Database {
  organizations: OrganizationsTable;
  users: UsersTable;
  projects: ProjectsTable;
  project_members: ProjectMembersTable;
  tasks: TasksTable;
  comments: CommentsTable;
  attachments: AttachmentsTable;
  notifications: NotificationsTable;
  audit_logs: AuditLogsTable;
  refresh_tokens: RefreshTokensTable;
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
  first_name: string;
  last_name: string;
  role: string;
  is_active: Generated<boolean>;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface ProjectsTable {
  id: Generated<string>;
  tenant_id: string;
  organization_id: string;
  name: string;
  description: string | null;
  deadline: string | null;
  status: string;
  created_by: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface TasksTable {
  id: Generated<string>;
  tenant_id: string;
  project_id: string;
  assignee_id: string | null;
  title: string;
  description: string | null;
  status: string;
  priority: string | null;
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
  uploaded_by: string | null;
  file_name: string;
  file_path: string;
  file_size: number;
  created_at: Generated<Date>;
}

export interface NotificationsTable {
  id: Generated<string>;
  tenant_id: string;
  user_id: string;
  type: string;
  message: string;
  read: Generated<boolean>;
  entity_type: string | null;
  entity_id: string | null;
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
  metadata: any | null;
  created_at: Generated<Date>;
}

export interface ProjectMembersTable {
  id: Generated<string>;
  tenant_id: string;
  project_id: string;
  user_id: string;
  role: string;
  created_at: Generated<Date>;
}

export interface RefreshTokensTable {
  id: Generated<string>;
  tenant_id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  created_at: Generated<Date>;
}
