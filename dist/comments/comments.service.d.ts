import { DatabaseService } from '../database/database.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsService {
    private readonly db;
    constructor(db: DatabaseService);
    create(dto: CreateCommentDto, userId: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        task_id: string;
        content: string;
        user_id: string;
    }>;
    findByTask(taskId: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        task_id: string;
        content: string;
        user_id: string;
    }[]>;
    findOne(id: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        task_id: string;
        content: string;
        user_id: string;
    }>;
    remove(id: string, userId: string, tenantId: string): Promise<{
        deleted: boolean;
    }>;
}
