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
  refresh_tokens: RefreshTokensTable;
  departments: DepartmentsTable;
  employees: EmployeesTable;
  attendance: AttendanceTable;
  leave_balances: LeaveBalancesTable;
  leave_requests: LeaveRequestsTable;
  payroll: PayrollTable;
  payslips: PayslipsTable;
  review_cycles: ReviewCyclesTable;
  reviews: ReviewsTable;
  documents: DocumentsTable;
  announcements: AnnouncementsTable;
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
  updated_at: Generated<Date>;
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

export interface RefreshTokensTable {
  id: Generated<string>;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  created_at: Generated<Date>;
}

export interface DepartmentsTable {
  id: Generated<string>;
  tenant_id: string;
  organization_id: string;
  name: string;
  description: string | null;
  manager_id: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface EmployeesTable {
  id: Generated<string>;
  tenant_id: string;
  organization_id: string;
  department_id: string | null;
  user_id: string;
  employee_number: string;
  position: string;
  hire_date: string;
  salary: number | null;
  status: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface AttendanceTable {
  id: Generated<string>;
  tenant_id: string;
  employee_id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: string;
  notes: string | null;
  created_at: Generated<Date>;
}

export interface LeaveBalancesTable {
  id: Generated<string>;
  tenant_id: string;
  employee_id: string;
  leave_type: string;
  total_days: number;
  used_days: number;
  remaining_days: number;
  year: number;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface LeaveRequestsTable {
  id: Generated<string>;
  tenant_id: string;
  employee_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days: number;
  reason: string | null;
  status: string;
  approved_by: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface PayrollTable {
  id: Generated<string>;
  tenant_id: string;
  employee_id: string;
  period_start: string;
  period_end: string;
  base_salary: number;
  deductions: number;
  net_salary: number;
  status: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface PayslipsTable {
  id: Generated<string>;
  tenant_id: string;
  employee_id: string;
  month: number;
  year: number;
  base_salary: number;
  deductions: number;
  bonuses: number;
  net_salary: number;
  status: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface ReviewCyclesTable {
  id: Generated<string>;
  tenant_id: string;
  organization_id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface ReviewsTable {
  id: Generated<string>;
  tenant_id: string;
  review_cycle_id: string;
  employee_id: string;
  reviewer_id: string;
  rating: number | null;
  comments: string | null;
  status: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface DocumentsTable {
  id: Generated<string>;
  tenant_id: string;
  uploaded_by: string;
  employee_id: string | null;
  name: string;
  file_path: string;
  file_size: number;
  document_type: string | null;
  created_at: Generated<Date>;
}

export interface AnnouncementsTable {
  id: Generated<string>;
  tenant_id: string;
  organization_id: string;
  title: string;
  content: string;
  published_by: string;
  is_active: Generated<boolean>;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}
