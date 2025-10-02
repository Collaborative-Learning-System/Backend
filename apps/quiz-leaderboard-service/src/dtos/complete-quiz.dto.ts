import { IsString, IsNotEmpty, IsOptional, IsUUID, IsInt, Min, Max, IsEnum, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateQuestionDto } from "./question.dto";

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
