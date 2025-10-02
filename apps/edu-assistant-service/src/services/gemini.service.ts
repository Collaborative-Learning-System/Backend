import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GenerateStudyPlanDto } from '../dtos/generate-study-plan.dto';
import { GeminiApiResponse, GeminiStudyPlanResponse } from '../dtos/gemini-api.dto';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly geminiApiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async generateStudyPlan(request: GenerateStudyPlanDto): Promise<GeminiStudyPlanResponse> {
    const prompt = this.buildPrompt(request);
    const apiKey = this.configService.get('GEMINI_API_KEY');
    const apiUrl = `${this.geminiApiBaseUrl}?key=${apiKey}`;
    
    try {
      const response = await firstValueFrom(
        this.httpService.post<GeminiApiResponse>(
          apiUrl,
          {
            contents: [{
              role: 'user',
              parts: [{ text: prompt }]
            }]
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
      );

      return this.parseGeminiResponse(response.data);
    } catch (error) {
      this.logger.error('Failed to generate study plan from Gemini API', error);
      throw new Error('Failed to generate study plan from AI service');
    }
  }

  private buildPrompt(request: GenerateStudyPlanDto): string {
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return `
Generate a comprehensive study plan in JSON format with the following requirements:

STUDY PLAN DETAILS:
- Subjects: ${request.subjects}
- Study Goal: ${request.studygoal}
- Learning Style: ${request.learningstyle}
- Difficulty Level: ${request.difficultyLevel || 'intermediate'}
- Duration: ${totalDays} days (from ${request.startDate} to ${request.endDate})
- Daily Hours: ${request.dailyHours} hours
- Preferred Time Slots: ${request.preferredTimeSlots.join(', ')}
- Include Regular Breaks: ${request.includeRegularBreaks}

RESPONSE FORMAT (return valid JSON only):
{
  "title": "Study Plan Title",
  "description": "Brief description of the study plan",
  "totalDays": ${totalDays},
  "tasks": [
    {
      "date": "YYYY-MM-DD",
      "title": "Task Title",
      "description": "Detailed task description",
      "type": "study|break|review|practice",
      "durationMinutes": 60,
      "startTime": "HH:MM",
      "endTime": "HH:MM"
    }
  ]
}

INSTRUCTIONS:
**CRITICAL INSTRUCTION: You must ONLY output the final JSON object. Do not provide any introductory text, explanation, or conversational filler before or after the JSON block.**
1. Create tasks for each day from ${request.startDate} to ${request.endDate}
2. Distribute ${request.dailyHours} hours of study time across each day
3. Focus tasks on: ${request.subjects}
4. Adapt content for ${request.learningstyle} learning style
5. Set difficulty appropriate for ${request.difficultyLevel || 'intermediate'} level
6. Schedule tasks during preferred time slots: ${request.preferredTimeSlots.join(', ')}
7. ${request.includeRegularBreaks ? 'Include 10-15 minute breaks between study sessions' : 'Focus on continuous study sessions'}
8. Ensure tasks align with the study goal: ${request.studygoal}
9. Use realistic time estimates for each task(show every times with minutes and hours )


Generate the study plan now:`;
  }

  private parseGeminiResponse(response: GeminiApiResponse): GeminiStudyPlanResponse {
    try {
      const content = response.candidates[0]?.content?.parts[0]?.text;
      if (!content) {
        throw new Error('No content received from Gemini API');
      }

      // Clean the response to extract only the JSON part
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in Gemini response');
      }

      const studyPlan = JSON.parse(jsonMatch[0]) as GeminiStudyPlanResponse;
      
      // Validate the structure
      if (!studyPlan.tasks || !Array.isArray(studyPlan.tasks)) {
        throw new Error('Invalid study plan structure: missing tasks array');
      }

      return studyPlan;
    } catch (error) {
      this.logger.error('Failed to parse Gemini API response', error);
      throw new Error('Failed to parse AI response into study plan');
    }
  }
}