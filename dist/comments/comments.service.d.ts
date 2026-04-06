import { DatabaseService } from '../database/database.service';
export declare class CommentsService {
    private readonly db;
    constructor(db: DatabaseService);
    findByTask(taskId: string, tenantId: string): Promise<{
        tenant_id: string;
        id: string;
        created_at: Date;
        task_id: string;
        author_id: string;
        content: string;
    }[]>;
}
