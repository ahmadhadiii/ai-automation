import { DatabaseService } from '../database/database.service';
export declare class AttachmentsService {
    private readonly db;
    constructor(db: DatabaseService);
    findByTask(taskId: string, tenantId: string): Promise<{
        tenant_id: string;
        id: string;
        task_id: string;
        file_name: string;
        file_url: string;
        uploaded_by: string;
        uploaded_at: Date;
    }[]>;
}
