import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        user: {
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
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            email: string;
            tenant_id: string;
            organization_id: string;
            id: string;
            first_name: string | null;
            last_name: string | null;
            role: string;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
        };
    }>;
}
