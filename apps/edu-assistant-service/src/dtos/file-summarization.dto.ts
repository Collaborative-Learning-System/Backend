import { IsOptional, IsNumber, Min, Max, IsString, IsIn } from 'class-validator';

export class FileSummarizationDto {
  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(1000)
  maxWords?: number = 200;

  @IsOptional()
  @IsString()
  summaryType?: 'brief' | 'detailed' | 'key-points' = 'detailed';

  @IsOptional()
  @IsString()
  @IsIn(['short', 'medium', 'detailed'])
  length?: 'short' | 'medium' | 'detailed' = 'medium';

  @IsOptional()
  @IsString()
  @IsIn(['general', 'key-points', 'action-items', 'technical'])
  focus?: 'general' | 'key-points' | 'action-items' | 'technical' = 'general';

  @IsOptional()
  @IsString()
  @IsIn(['formal', 'casual', 'academic'])
  tone?: 'formal' | 'casual' | 'academic' = 'formal';
}