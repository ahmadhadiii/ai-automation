import { IsEmail, IsString, MinLength, IsIn, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsIn(['ADMIN', 'MANAGER', 'MEMBER'])
  role?: 'ADMIN' | 'MANAGER' | 'MEMBER';

  @IsString()
  tenant_id: string;
}
