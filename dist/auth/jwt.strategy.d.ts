import { Strategy } from 'passport-jwt';
import { DatabaseService } from '../database/database.service';
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    tenant_id: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly db;
    constructor(db: DatabaseService);
    validate(payload: JwtPayload): Promise<{
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
}
export {};
