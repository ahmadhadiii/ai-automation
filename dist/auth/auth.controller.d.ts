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
            role: string;
            tenant_id: string;
            id: string;
            created_at: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            email: string;
            role: string;
            tenant_id: string;
            id: string;
            is_active: boolean;
            created_at: Date;
        };
    }>;
}
