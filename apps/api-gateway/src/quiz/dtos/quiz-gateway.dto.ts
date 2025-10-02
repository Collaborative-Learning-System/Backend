import { IsString, IsNotEmpty, IsOptional, IsUUID, IsInt, Min, Max, IsEnum, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

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

export class CompleteQuizDto {
  @IsUUID()
  @IsNotEmpty()
  quizId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @IsNotEmpty()
  questions: CreateQuestionDto[];
}

export class CreateCompleteQuizDto {
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @IsNotEmpty()
  questions: CreateQuestionDto[];
}

export class GetQuizDto {
  @IsUUID()
  @IsNotEmpty()
  quizId: string;
}

export class GetQuizzesByGroupDto {
  @IsUUID()
  @IsNotEmpty()
  groupId: string;
}

// Quiz Attempt DTOs
export class StartQuizAttemptDto {
  @IsUUID()
  @IsNotEmpty()
  quizId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

export class SaveUserAnswerDto {
  @IsUUID()
  @IsNotEmpty()
  attemptId: string;

  @IsUUID()
  @IsNotEmpty()
  questionId: string;

  @IsUUID()
  @IsOptional()
  selectedOptionId?: string;

  @IsString()
  @IsOptional()
  userAnswer?: string;
}

export class CompleteQuizAttemptDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  attemptId: string;
}

export class GetQuizAttemptDto {
  @IsUUID()
  @IsNotEmpty()
  attemptId: string;
}

export class GetUserQuizAttemptsDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  quizId: string;
}

export class GetQuizLeaderboardDto {
  @IsUUID()
  @IsNotEmpty()
  quizId: string;
}

