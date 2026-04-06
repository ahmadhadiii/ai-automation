import { DatabaseService } from '../database/database.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private readonly db;
    constructor(db: DatabaseService);
    create(dto: CreateTaskDto, tenantId: string): Promise<{
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        status: string;
        title: string;
        project_id: string;
        assignee_id: string | null;
        due_date: string | null;
    }>;
    findAll(tenantId: string): Promise<{
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        status: string;
        title: string;
        project_id: string;
        assignee_id: string | null;
        due_date: string | null;
    }[]>;
    findOne(id: string, tenantId: string): Promise<{
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        status: string;
        title: string;
        project_id: string;
        assignee_id: string | null;
        due_date: string | null;
    }>;
    update(id: string, dto: UpdateTaskDto, tenantId: string): Promise<{
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        status: string;
        title: string;
        project_id: string;
        assignee_id: string | null;
        due_date: string | null;
    }>;
    remove(id: string, tenantId: string): Promise<{
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        status: string;
        title: string;
        project_id: string;
        assignee_id: string | null;
        due_date: string | null;
    }>;
}
