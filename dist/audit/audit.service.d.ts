import { DatabaseService } from '../database/database.service';
export declare class AuditService {
    private readonly db;
    constructor(db: DatabaseService);
    log(userId: string, action: string, entityType: string, entityId: string, tenantId: string): Promise<{
        tenant_id: string;
        id: string;
        created_at: Date;
        user_id: string | null;
        action: string;
        entity_type: string;
        entity_id: string | null;
        metadata: Record<string, unknown> | null;
    }>;
    findByTenant(tenantId: string): Promise<{
        tenant_id: string;
        id: string;
        created_at: Date;
        user_id: string | null;
        action: string;
        entity_type: string;
        entity_id: string | null;
        metadata: Record<string, unknown> | null;
    }[]>;
}
