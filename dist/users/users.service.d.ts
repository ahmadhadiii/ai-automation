import { DatabaseService } from '../database/database.service';
import { UserResponseDto } from './dto/user-response.dto';
export declare class UsersService {
    private readonly db;
    constructor(db: DatabaseService);
    findById(id: string): Promise<{
        email: string;
        tenant_id: string;
        organization_id: string;
        id: string;
        password_hash: string;
        first_name: string | null;
        last_name: string | null;
        role: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    findByTenant(tenantId: string): Promise<{
        email: string;
        tenant_id: string;
        organization_id: string;
        id: string;
        password_hash: string;
        first_name: string | null;
        last_name: string | null;
        role: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findAllByTenant(tenantId: string): Promise<UserResponseDto[]>;
}
