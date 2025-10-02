export class StudyTaskResponseDto {
  id?: number;
  date: string;
  title: string;
  description: string;
  type: string;
  durationMinutes: number;
  startTime: string;
  endTime: string;
}

export class StudyPlanResponseDto {
  planId: number;
  userId: string;
  title: string;
  subjects: string;
  studyGoal: string;
  learningStyle: string;
  difficultyLevel: string;
  startDate: string;
  endDate: string;
  dailyHours: number;
  preferredTimeSlots: string[];
  includeRegularBreaks: boolean;
  createdAt: Date;
  tasks: StudyTaskResponseDto[];
}