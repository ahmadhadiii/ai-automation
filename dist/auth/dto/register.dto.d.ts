export declare class RegisterDto {
    email: string;
    password: string;
    role?: 'ADMIN' | 'MANAGER' | 'MEMBER';
    tenant_id: string;
}
