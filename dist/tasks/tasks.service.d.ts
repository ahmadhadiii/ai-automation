import { DatabaseService } from '../database/database.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private readonly db;
    constructor(db: DatabaseService);
    create(dto: CreateTaskDto, userId: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        status: "ToDo" | "InProgress" | "Completed";
        created_by: string;
        title: string;
        project_id: string;
        assignee_id: string | null;
        due_date: Date | null;
    }>;
    findAll(tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        status: "ToDo" | "InProgress" | "Completed";
        created_by: string;
        title: string;
        project_id: string;
        assignee_id: string | null;
        due_date: Date | null;
    }[]>;
    findOne(id: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        status: "ToDo" | "InProgress" | "Completed";
        created_by: string;
        title: string;
        project_id: string;
        assignee_id: string | null;
        due_date: Date | null;
    }>;
    update(id: string, dto: UpdateTaskDto, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        status: "ToDo" | "InProgress" | "Completed";
        created_by: string;
        title: string;
        project_id: string;
        assignee_id: string | null;
        due_date: Date | null;
    }>;
    remove(id: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        status: "ToDo" | "InProgress" | "Completed";
        created_by: string;
        title: string;
        project_id: string;
        assignee_id: string | null;
        due_date: Date | null;
    }>;
}
