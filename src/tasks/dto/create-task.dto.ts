import { IsString, IsOptional, IsIn, IsUUID, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(1, 255)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  assigned_to?: string;

  @IsOptional()
  @IsIn(['ToDo', 'InProgress', 'Completed'])
  status?: string;
}
