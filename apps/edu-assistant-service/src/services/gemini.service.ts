import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GenerateStudyPlanDto } from '../dtos/generate-study-plan.dto';
import { GeminiApiResponse, GeminiStudyPlanResponse } from '../dtos/gemini-api.dto';
import { SuggestedWorkspacesDto } from '../dtos/suggestWorkspace.dto';

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

  async getPersonalizedWorkspaceSuggestions(suggestedWorkspaceDto: SuggestedWorkspacesDto): Promise<any> { 
    const apiKey = this.configService.get('GEMINI_API_KEY');
    const apiUrl = `${this.geminiApiBaseUrl}?key=${apiKey}`;
    const prompt = this.buildPromptForWorkspaces(suggestedWorkspaceDto);

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

      this.logger.log('Gemini API response status:', response.status);
      this.logger.log('Full Gemini response:', JSON.stringify(response.data, null, 2));

      // Parse the Gemini response to extract the actual content
      if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const aiResponseText = response.data.candidates[0].content.parts[0].text;
        this.logger.log('Raw AI response text:', aiResponseText);
        
        try {
          // Clean the response text (remove markdown code blocks if present)
          let cleanedText = aiResponseText.trim();
          if (cleanedText.startsWith('```json')) {
            cleanedText = cleanedText.replace(/```json\s*/, '').replace(/```\s*$/, '');
          } else if (cleanedText.startsWith('```')) {
            cleanedText = cleanedText.replace(/```\s*/, '').replace(/```\s*$/, '');
          }
          
          this.logger.log('Cleaned text for parsing:', cleanedText);
          
          // Try to parse the JSON response from Gemini
          const parsedResponse = JSON.parse(cleanedText);
          this.logger.log('Successfully parsed Gemini response:', JSON.stringify(parsedResponse, null, 2));
          return parsedResponse;
        } catch (parseError) {
          this.logger.error('Failed to parse Gemini JSON response', parseError);
          this.logger.error('Raw Gemini response text:', aiResponseText);
          // Return a fallback structure if parsing fails
          return {
            suggestedWorkspaces: []
          };
        }
      } else {
        this.logger.error('Unexpected Gemini API response structure');
        this.logger.error('Response data:', JSON.stringify(response.data, null, 2));
        return {
          suggestedWorkspaces: []
        };
      }

    } catch (error) {
      this.logger.error('Failed to get workspace suggestions from Gemini API', error);
      throw new Error('Failed to get workspace suggestions from AI service');
    }
  }

  private buildPromptForWorkspaces(request: SuggestedWorkspacesDto): string { 
    return `
You are an intelligent workspace recommendation engine designed to help users discover new, relevant workspaces based on their current interests and participation patterns.

Your goal is to analyze the user's **current workspaces** and **available workspaces from similar users** to generate the top 5 personalized workspace recommendations.

Instructions:
1. Carefully study the topics, descriptions, tags, or names of the user's current workspaces to understand their learning and professional interests.
2. Compare these with the available workspaces from similar users.
3. Select 5 workspaces that most closely align with or complement the user’s current interests.
4. Provide short, meaningful descriptions explaining **why** each workspace is relevant for the user.
5. Be diverse but relevant — suggest both closely related and a few new but complementary areas.

Input Data:
- Current User Workspaces: 
${JSON.stringify(request.myWorkspaces, null, 2)}

- Available Workspaces from Similar Users: 
${JSON.stringify(request.suggestedWorkspaces, null, 2)}

Output Format:
Respond with ONLY a valid JSON object in this exact format:
{
  "suggestedWorkspaces": [
    {
      "workspaceId": "actual_workspace_id",
      "workspaceName": "Actual Workspace Name",
      "description": "Brief description of why this workspace is recommended for the user"
    }
  ]
}

Rules:
- The output must be **strictly valid JSON** (no markdown, no extra text).
- Include **exactly 5** recommended workspaces.
- Descriptions must be concise (under 25 words) and show clear relevance to the user's interests.
- If there are fewer than 5 suitable workspaces, include only those that are genuinely relevant.

    `;
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