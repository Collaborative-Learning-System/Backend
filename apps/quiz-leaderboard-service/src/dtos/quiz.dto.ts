import { IsString, IsNotEmpty, IsOptional, IsUUID, IsInt, Min ,Max, IsEnum, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateQuestionDto } from "./question.dto";

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
  
  
  @IsEnum(['EASY', 'MEDIUM', 'HARD'])
  @IsOptional()
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';

  @IsString()
  @IsOptional()
  instructions?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @IsOptional()
  questions?: CreateQuestionDto[];
}