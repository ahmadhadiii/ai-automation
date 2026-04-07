import { DatabaseService } from '../database/database.service';
export declare class AuditService {
    private readonly db;
    constructor(db: DatabaseService);
    log(userId: string, action: string, entityType: string, entityId: string, tenantId: string, organizationId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        user_id: string;
        action: string;
        entity_type: string;
        entity_id: string;
        metadata: unknown;
    }>;
    findByTenant(tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        user_id: string;
        action: string;
        entity_type: string;
        entity_id: string;
        metadata: unknown;
    }[]>;
}
