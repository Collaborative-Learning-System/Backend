import { IsUUID, IsNumber, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class CreateQuizAttemptDto {
    @IsUUID()
    quizId: string;

    @IsUUID()
    userId: string;
}

export class UpdateQuizAttemptDto {
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    score?: number;

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}

export class QuizAttemptResponseDto {
  attemptId: string;
  quizId: string;
  userId: string;
  score: number;
  attemptAt: Date;
  isCompleted: boolean;
}
