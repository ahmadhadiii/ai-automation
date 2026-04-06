import { IsString, IsOptional, IsDateString, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsUUID()
  organization_id: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;
}
