import { IsString, IsNotEmpty, IsOptional, IsUUID, IsInt, Min, IsEnum, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateQuestionOptionDto {
  @IsString()
  @IsNotEmpty()
  optionText: string;

  @IsOptional()
  isCorrect?: boolean;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsEnum(['MCQ', 'TRUE_FALSE', 'SHORT_ANSWER'])
  @IsOptional()
  questionType?: 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER';

  @IsInt()
  @Min(1, { message: 'Points must be at least 1' })
  @IsOptional()
  points?: number;

  @IsString()
  @IsOptional()
  correctAnswer?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionOptionDto)
  @IsOptional()
  options?: CreateQuestionOptionDto[];
}
