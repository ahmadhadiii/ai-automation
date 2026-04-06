import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(dto: CreateTaskDto, req: any): Promise<{
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
    findAll(req: any): Promise<{
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
    findOne(id: string, req: any): Promise<{
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
    update(id: string, dto: UpdateTaskDto, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
