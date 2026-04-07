import { DatabaseService } from '../database/database.service';
export declare class AttachmentsService {
    private readonly db;
    constructor(db: DatabaseService);
    findByTask(taskId: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        task_id: string;
        uploaded_by: string;
        file_name: string;
        file_url: string;
    }[]>;
}
