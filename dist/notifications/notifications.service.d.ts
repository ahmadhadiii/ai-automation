import { DatabaseService } from '../database/database.service';
export declare class NotificationsService {
    private readonly db;
    constructor(db: DatabaseService);
    findByUser(userId: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        user_id: string;
        type: string;
        message: string;
        is_read: boolean;
    }[]>;
    markAsRead(id: string, userId: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        user_id: string;
        type: string;
        message: string;
        is_read: boolean;
    }>;
    create(userId: string, organizationId: string, type: string, message: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        user_id: string;
        type: string;
        message: string;
        is_read: boolean;
    }>;
}
