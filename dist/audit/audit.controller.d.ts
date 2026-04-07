import { AuditService } from './audit.service';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    findAll(req: any): Promise<{
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
