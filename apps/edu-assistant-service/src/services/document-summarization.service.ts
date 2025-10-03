import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TextSummarizationDto } from '../dtos/text-summarization.dto';
import { SummarizationResponseDto } from '../dtos/summarization-response.dto';

@Injectable()
export class DocumentSummarizationService {
  private readonly logger = new Logger(DocumentSummarizationService.name);
  private readonly geminiApiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly MAX_CHUNK_SIZE = 4000;
  private readonly OVERLAP_SIZE = 200;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not found in environment variables');
    }
  }

  private adjustMaxWordsByLength(baseMaxWords: number, length: string): number {
    const defaultMaxWords = baseMaxWords || this.getDefaultMaxWords(length);
    
    switch (length) {
      case 'short':
        return Math.floor(defaultMaxWords * 0.5);
      case 'medium':
        return defaultMaxWords;
      case 'detailed':
        return Math.floor(defaultMaxWords * 1.5);
      default:
        return defaultMaxWords;
    }
  }

  private getDefaultMaxWords(length: string): number {
    switch (length) {
      case 'short':
        return 100;
      case 'medium':
        return 200;
      case 'detailed':
        return 300;
      default:
        return 200;
    }
  }

  private async callGeminiAPI(prompt: string): Promise<string> {
    const apiKey = this.configService.get('GEMINI_API_KEY');
    const apiUrl = `${this.geminiApiBaseUrl}?key=${apiKey}`;
    
    try {
      const response = await firstValueFrom(
        this.httpService.post(
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

      const responseText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!responseText) {
        throw new Error('Invalid response format from Gemini API');
      }

      return responseText.trim();
    } catch (error) {
      this.logger.error('Failed to call Gemini API', error);
      throw new Error('Failed to generate summary from AI service');
    }
  }

  async summarizeText(dto: TextSummarizationDto): Promise<SummarizationResponseDto> {
    const startTime = Date.now();
    const summaryType = dto.summaryType || 'detailed';
    const length = dto.length || 'medium';
    
    let maxWords = dto.maxWords || this.getDefaultMaxWords(length);
    maxWords = this.adjustMaxWordsByLength(maxWords, length);

    try {
      this.logger.log(`Starting text summarization for ${dto.text.length} characters`);
      
      if (dto.text.length <= this.MAX_CHUNK_SIZE) {
        const summary = await this.generateSingleSummary(dto.text, summaryType, maxWords, dto);
        
        return this.createResponse(
          summary,
          dto.text.length,
          summary.length,
          Date.now() - startTime,
          summaryType,
          maxWords,
          1,
          dto
        );
      }

      return await this.hierarchicalSummarization(dto, startTime);
      
    } catch (error) {
      this.logger.error('Error in text summarization:', error);
      throw new Error(`Summarization failed: ${error.message}`);
    }
  }

  private async hierarchicalSummarization(
    dto: TextSummarizationDto, 
    startTime: number
  ): Promise<SummarizationResponseDto> {
    const summaryType = dto.summaryType || 'detailed';
    const length = dto.length || 'medium';
    
    let maxWords = dto.maxWords || this.getDefaultMaxWords(length);
    maxWords = this.adjustMaxWordsByLength(maxWords, length);
    
    const chunks = this.splitTextIntoChunks(dto.text);
    this.logger.log(`Split text into ${chunks.length} chunks`);

    const chunkSummaries: string[] = [];
    for (let i = 0; i < chunks.length; i++) {
      this.logger.log(`Processing chunk ${i + 1}/${chunks.length}`);
      
      const chunkSummary = await this.generateSingleSummary(
        chunks[i], 
        'brief', 
        Math.ceil(maxWords / chunks.length), 
        dto
      );
      
      chunkSummaries.push(chunkSummary);
    }

    const combinedChunkSummaries = chunkSummaries.join('\n\n');
    
    const finalSummary = await this.generateSingleSummary(
      combinedChunkSummaries,
      summaryType,
      maxWords,
      dto
    );

    return this.createResponse(
      finalSummary,
      dto.text.length,
      finalSummary.length,
      Date.now() - startTime,
      summaryType,
      maxWords,
      chunks.length,
      dto
    );
  }

  private splitTextIntoChunks(text: string): string[] {
    const chunks: string[] = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      let endIndex = currentIndex + this.MAX_CHUNK_SIZE;
      
      if (endIndex < text.length) {
        const sentenceBreak = text.lastIndexOf('.', endIndex);
        const exclamationBreak = text.lastIndexOf('!', endIndex);
        const questionBreak = text.lastIndexOf('?', endIndex);
        
        const lastSentenceBreak = Math.max(sentenceBreak, exclamationBreak, questionBreak);
        
        if (lastSentenceBreak > currentIndex + this.MAX_CHUNK_SIZE - 500) {
          endIndex = lastSentenceBreak + 1;
        } else {
          const lastSpaceIndex = text.lastIndexOf(' ', endIndex);
          if (lastSpaceIndex > currentIndex + this.MAX_CHUNK_SIZE - 100) {
            endIndex = lastSpaceIndex;
          }
        }
      }

      chunks.push(text.slice(currentIndex, endIndex).trim());
      currentIndex = endIndex - this.OVERLAP_SIZE;
      
      if (currentIndex < 0) currentIndex = endIndex;
    }

    return chunks.filter(chunk => chunk.length > 0);
  }

  private async generateSingleSummary(
    text: string, 
    summaryType: string, 
    maxWords: number,
    dto?: Partial<TextSummarizationDto>
  ): Promise<string> {
    const prompt = this.buildSummarizationPrompt(text, summaryType, maxWords, dto);
    
    try {
      let summary = await this.callGeminiAPI(prompt);
      
      if (!summary) {
        throw new Error('Empty response from AI model');
      }

      if (summary.length >= text.length) {
        this.logger.warn(`Summary is longer than original text, requesting shorter version`);
        
        const strictPrompt = `
The previous summary was too long. Please create a much shorter summary of the following text.

STRICT Requirements:
- Maximum ${Math.floor(maxWords * 0.7)} words
- Maximum ${Math.floor(text.length * 0.5)} characters
- Must be significantly shorter than the original text
- Only include the most essential information

Text: ${text}

Short Summary:`;

        summary = await this.callGeminiAPI(strictPrompt);
      }
      
      return summary;
    } catch (error) {
      this.logger.error('Error generating summary:', error);
      throw new Error(`AI summarization failed: ${error.message}`);
    }
  }

  private buildSummarizationPrompt(text: string, summaryType: string, maxWords: number, dto?: Partial<TextSummarizationDto>): string {
    let instructions = '';
    
    // Build focus-based instructions
    const focus = dto?.focus || 'general';
    const tone = dto?.tone || 'formal';
    
    switch (summaryType) {
      case 'brief':
        instructions = `Create a very concise summary that captures only the most essential points in as few words as possible.`;
        maxWords = Math.min(maxWords, Math.floor(maxWords * 0.5));
        break;
      case 'detailed':
        instructions = `Create a comprehensive but concise summary that covers important topics efficiently.`;
        break;
      case 'key-points':
        instructions = `Extract and list the 3-5 most important key points in bullet format.`;
        break;
      default:
        instructions = `Create a balanced, concise summary focusing on main topics.`;
    }

    // Add focus-specific instructions
    let focusInstructions = '';
    switch (focus) {
      case 'key-points':
        focusInstructions = 'Focus on identifying and highlighting the most important key points and main takeaways.';
        break;
      case 'action-items':
        focusInstructions = 'Emphasize actionable items, recommendations, and steps that can be taken.';
        break;
      case 'technical':
        focusInstructions = 'Focus on technical details, methodologies, processes, and technical specifications.';
        break;
      case 'general':
      default:
        focusInstructions = 'Provide a general overview covering all important aspects evenly.';
    }

    // Add tone-specific instructions
    let toneInstructions = '';
    switch (tone) {
      case 'casual':
        toneInstructions = 'Use a conversational, easy-to-read tone with simple language.';
        break;
      case 'academic':
        toneInstructions = 'Use scholarly language, maintain objectivity, and include precise terminology.';
        break;
      case 'formal':
      default:
        toneInstructions = 'Use professional, clear, and formal language appropriate for business contexts.';
    }

    const originalCharCount = text.length;
    const maxCharacters = Math.min(maxWords * 6, Math.floor(originalCharCount * 0.6));

    return `
Please summarize the following text. ${instructions}

FOCUS: ${focusInstructions}
TONE: ${toneInstructions}

CRITICAL Requirements:
- Maximum ${maxWords} words AND maximum ${maxCharacters} characters
- The summary MUST be shorter than the original text (original has ${originalCharCount} characters)
- Clear and coherent structure
- Maintain the original meaning and context
- Be concise and avoid redundancy

Text to summarize:
${text}

Summary:`;
  }

  private createResponse(
    summary: string,
    originalLength: number,
    summaryLength: number,
    processingTime: number,
    summaryType: string,
    maxWords: number,
    chunksProcessed?: number,
    dto?: Partial<TextSummarizationDto>
  ): SummarizationResponseDto {
    return {
      summary,
      originalLength,
      summaryLength,
      processingTime,
      chunksProcessed,
      metadata: {
        summaryType,
        maxWords,
        timestamp: new Date().toISOString(),
        length: dto?.length,
        focus: dto?.focus,
        tone: dto?.tone,
      },
    };
  }
}