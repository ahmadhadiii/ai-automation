import { DatabaseService } from '../database/database.service';
export declare class NotificationsService {
    private readonly db;
    constructor(db: DatabaseService);
    findByUser(userId: string, tenantId: string): Promise<{
        tenant_id: string;
        id: string;
        created_at: Date;
        user_id: string;
        message: string;
        read: boolean;
    }[]>;
}
