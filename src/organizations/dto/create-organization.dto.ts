import { IsEmail, IsString, MinLength, Length } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @Length(1, 100)
  first_name: string;

  @IsString()
  @Length(1, 100)
  last_name: string;
}
