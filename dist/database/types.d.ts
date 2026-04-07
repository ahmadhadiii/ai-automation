import { Generated } from 'kysely';
export interface UserTable {
    id: Generated<string>;
    email: string;
    password_hash: string;
    first_name: string | null;
    last_name: string | null;
    role: string;
    is_active: Generated<boolean>;
    tenant_id: string;
    organization_id: string;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}
export interface OrganizationTable {
    id: Generated<string>;
    name: string;
    tenant_id: string;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}
export interface OrganizationMemberTable {
    id: Generated<string>;
    organization_id: string;
    user_id: string;
    role: 'Admin' | 'ProjectManager' | 'Member';
    tenant_id: string;
    created_at: Generated<Date>;
}
export interface ProjectTable {
    id: Generated<string>;
    organization_id: string;
    name: string;
    description: string | null;
    status: 'Active' | 'Archived';
    created_by: string;
    tenant_id: string;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}
export interface TaskTable {
    id: Generated<string>;
    project_id: string;
    organization_id: string;
    title: string;
    description: string | null;
    status: 'ToDo' | 'InProgress' | 'Completed';
    assignee_id: string | null;
    created_by: string;
    due_date: Date | null;
    tenant_id: string;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}
export interface CommentTable {
    id: Generated<string>;
    task_id: string;
    user_id: string;
    organization_id: string;
    content: string;
    tenant_id: string;
    created_at: Generated<Date>;
}
export interface AttachmentTable {
    id: Generated<string>;
    task_id: string;
    uploaded_by: string;
    organization_id: string;
    file_name: string;
    file_url: string;
    tenant_id: string;
    created_at: Generated<Date>;
}
export interface NotificationTable {
    id: Generated<string>;
    user_id: string;
    organization_id: string;
    type: string;
    message: string;
    is_read: boolean;
    tenant_id: string;
    created_at: Generated<Date>;
}
export interface AuditLogTable {
    id: Generated<string>;
    organization_id: string;
    user_id: string;
    action: string;
    entity_type: string;
    entity_id: string;
    metadata: unknown;
    tenant_id: string;
    created_at: Generated<Date>;
}
export interface RefreshTokensTable {
    id: Generated<string>;
    user_id: string;
    token_hash: string;
    expires_at: Date;
    tenant_id: string;
    created_at: Generated<Date>;
}
export interface ProjectMembersTable {
    id: Generated<string>;
    project_id: string;
    user_id: string;
    role: string;
    tenant_id: string;
    created_at: Generated<Date>;
}
export interface Database {
    users: UserTable;
    organizations: OrganizationTable;
    organization_members: OrganizationMemberTable;
    projects: ProjectTable;
    tasks: TaskTable;
    comments: CommentTable;
    attachments: AttachmentTable;
    notifications: NotificationTable;
    audit_logs: AuditLogTable;
    refresh_tokens: RefreshTokensTable;
    project_members: ProjectMembersTable;
}
