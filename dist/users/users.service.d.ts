import { DatabaseService } from '../database/database.service';
export declare class UsersService {
    private readonly db;
    constructor(db: DatabaseService);
    findById(id: string): Promise<{
        email: string;
        role: string;
        tenant_id: string;
        id: string;
        is_active: boolean;
        created_at: Date;
    }>;
    findByTenant(tenantId: string): Promise<{
        email: string;
        role: string;
        tenant_id: string;
        id: string;
        is_active: boolean;
        created_at: Date;
    }[]>;
}
