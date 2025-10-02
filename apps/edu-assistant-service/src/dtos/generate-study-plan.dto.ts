import { IsString, IsDateString, IsNumber, IsArray, IsBoolean, IsIn, IsNotEmpty, Min, Max, IsUUID } from 'class-validator';

export class GenerateStudyPlanDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  subjects: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.5, { message: 'Daily hours must be at least 0.5 hours' })
  @Max(12, { message: 'Daily hours cannot exceed 12 hours' })
  dailyHours: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @IsIn(['morning', 'afternoon', 'evening', 'night'], { each: true })
  preferredTimeSlots: string[];

  @IsNotEmpty()
  @IsBoolean()
  includeRegularBreaks: boolean;

  @IsNotEmpty()
  @IsString()
  studygoal: string;

  @IsNotEmpty()
  @IsString()
  learningstyle: string;

  @IsString()
  difficultyLevel?: string = 'intermediate';
}