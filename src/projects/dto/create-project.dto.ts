import { IsString, IsOptional, Length, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
