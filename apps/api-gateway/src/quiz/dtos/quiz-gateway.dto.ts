import { IsString, IsNotEmpty, IsOptional, IsUUID, IsInt, Min, Max, IsEnum } from "class-validator";

export class CreateQuizDto {
  @IsUUID()
  @IsNotEmpty()
  groupId: string;

  @IsString()
  @IsNotEmpty()
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  @Min(1, { message: 'Time limit must be at least 1 minute' })
  @Max(480, { message: 'Time limit cannot exceed 8 hours' })
  timeLimit?: number;
  
  @IsInt()
  @IsOptional()
  fullMarks?: number;

  @IsEnum(['EASY', 'MEDIUM', 'HARD'])
  @IsOptional()
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';

  @IsString()
  @IsOptional()
  instructions?: string;
}

export class GetQuizDto {
  @IsUUID()
  @IsNotEmpty()
  quizId: string;
}

