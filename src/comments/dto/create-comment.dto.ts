import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  task_id: string;

  @IsString()
  @MinLength(1)
  content: string;
}
