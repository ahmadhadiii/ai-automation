import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(dto: CreateTaskDto, req: any): Promise<{
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
    findAll(req: any): Promise<{
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
    findOne(id: string, req: any): Promise<{
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
    update(id: string, dto: UpdateTaskDto, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
