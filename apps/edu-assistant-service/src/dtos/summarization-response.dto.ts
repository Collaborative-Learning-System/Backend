export class SummarizationResponseDto {
  summary: string;
  originalLength: number;
  summaryLength: number;
  processingTime: number;
  chunksProcessed?: number;
  metadata: {
    summaryType: string;
    maxWords: number;
    timestamp: string;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    extractionTime?: number;
    length?: 'short' | 'medium' | 'detailed';
    focus?: 'general' | 'key-points' | 'action-items' | 'technical';
    tone?: 'formal' | 'casual' | 'academic';
  };
}

export class ErrorResponseDto {
  message: string;
  error: string;
  statusCode: number;
  timestamp: string;
}