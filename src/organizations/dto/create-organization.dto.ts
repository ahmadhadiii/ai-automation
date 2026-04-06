import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsEmail()
  adminEmail: string;

  @IsString()
  @MinLength(6)
  password: string;
}
