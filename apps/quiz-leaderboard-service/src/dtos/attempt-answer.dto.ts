import { IsUUID, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateAttemptAnswerDto {
    @IsUUID()
    attemptId: string;

    @IsUUID()
    questionId: string;

    @IsOptional()
    @IsUUID()
    selectedOptionId?: string;

    @IsOptional()
    @IsString()
    userAnswer?: string;
}

export class UpdateAttemptAnswerDto {
    @IsOptional()
    @IsUUID()
    selectedOptionId?: string;

    @IsOptional()
    @IsString()
    userAnswer?: string;

    @IsOptional()
    @IsBoolean()
    isCorrect?: boolean;
}

export class AttemptAnswerResponseDto {
    attemptAnswerId: string;
    attemptId: string;
    questionId: string;
    selectedOptionId: string | null;
    userAnswer: string | null;
    isCorrect: boolean | null;
}
