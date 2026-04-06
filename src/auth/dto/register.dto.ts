import { IsEmail, IsString, MinLength, IsIn, IsOptional, IsUUID } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsIn(['Admin', 'ProjectManager', 'Member'])
  role?: 'Admin' | 'ProjectManager' | 'Member';

  @IsString()
  tenant_id: string;

  @IsUUID()
  organization_id: string;
}
