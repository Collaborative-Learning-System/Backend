export interface GeminiApiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface GeminiStudyPlanTask {
  date: string;
  title: string;
  description: string;
  type: 'study' | 'break' | 'review' | 'practice';
  durationMinutes: number;
  startTime: string;
  endTime: string;
}

export interface GeminiStudyPlanResponse {
  title: string;
  description: string;
  totalDays: number;
  tasks: GeminiStudyPlanTask[];
}