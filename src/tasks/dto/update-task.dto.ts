import { IsString, IsOptional, IsIn, IsUUID, IsDateString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['ToDo', 'InProgress', 'Completed'])
  status?: 'ToDo' | 'InProgress' | 'Completed';

  @IsOptional()
  @IsUUID()
  assignee_id?: string;

  @IsOptional()
  @IsDateString()
  due_date?: string;
}
