import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TextSummarizationDto } from '../dtos/text-summarization.dto';
import { SummarizationResponseDto } from '../dtos/summarization-response.dto';

@Injectable()
export class DocumentSummarizationService {
  private readonly logger = new Logger(DocumentSummarizationService.name);
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: any;

  // Configuration constants
  private readonly MAX_CHUNK_SIZE = 4000; // Characters per chunk
  private readonly OVERLAP_SIZE = 200; // Overlap between chunks

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not found in environment variables');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  private adjustMaxWordsByLength(baseMaxWords: number, length: string): number {
    // If maxWords is not provided, use length-based defaults
    const defaultMaxWords = baseMaxWords || this.getDefaultMaxWords(length);
    
    switch (length) {
      case 'short':
        return Math.floor(defaultMaxWords * 0.5); // 50% of base
      case 'medium':
        return defaultMaxWords; // 100% of base
      case 'detailed':
        return Math.floor(defaultMaxWords * 1.5); // 150% of base
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

  async summarizeText(dto: TextSummarizationDto): Promise<SummarizationResponseDto> {
    const startTime = Date.now();
    const summaryType = dto.summaryType || 'detailed';
    const length = dto.length || 'medium';
    
    // If maxWords is not provided, use length-based defaults
    let maxWords = dto.maxWords || this.getDefaultMaxWords(length);
    
    // Adjust maxWords based on length preference
    maxWords = this.adjustMaxWordsByLength(maxWords, length);
    
    try {
      this.logger.log(`Starting text summarization for ${dto.text.length} characters with length: ${dto.length}, focus: ${dto.focus}, tone: ${dto.tone}`);
      
      // If text is small enough, process directly
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

      // For larger texts, use hierarchical summarization
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
    
    // If maxWords is not provided, use length-based defaults
    let maxWords = dto.maxWords || this.getDefaultMaxWords(length);
    
    // Adjust maxWords based on length preference
    maxWords = this.adjustMaxWordsByLength(maxWords, length);
    
    // Step 1: Split text into chunks
    const chunks = this.splitTextIntoChunks(dto.text);
    this.logger.log(`Split text into ${chunks.length} chunks`);

    // Step 2: Summarize each chunk
    const chunkSummaries: string[] = [];
    for (let i = 0; i < chunks.length; i++) {
      this.logger.log(`Processing chunk ${i + 1}/${chunks.length}`);
      
      const chunkSummary = await this.generateSingleSummary(
        chunks[i], 
        'brief', // Use brief for chunks to keep them concise
        Math.ceil(maxWords / chunks.length), // Distribute word limit across chunks
        dto
      );
      
      chunkSummaries.push(chunkSummary);
    }

    // Step 3: Combine chunk summaries
    const combinedChunkSummaries = chunkSummaries.join('\n\n');
    
    // Step 4: Generate final summary from chunk summaries
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
      
      // If we're not at the end of the text, try to break at a sentence or word boundary
      if (endIndex < text.length) {
        // Look for sentence boundary (. ! ?) within the last 200 characters
        const sentenceBreak = text.lastIndexOf('.', endIndex);
        const exclamationBreak = text.lastIndexOf('!', endIndex);
        const questionBreak = text.lastIndexOf('?', endIndex);
        
        const lastSentenceBreak = Math.max(sentenceBreak, exclamationBreak, questionBreak);
        
        if (lastSentenceBreak > currentIndex + this.MAX_CHUNK_SIZE - 500) {
          endIndex = lastSentenceBreak + 1;
        } else {
          // Fallback to word boundary
          const lastSpaceIndex = text.lastIndexOf(' ', endIndex);
          if (lastSpaceIndex > currentIndex + this.MAX_CHUNK_SIZE - 100) {
            endIndex = lastSpaceIndex;
          }
        }
      }

      chunks.push(text.slice(currentIndex, endIndex).trim());
      currentIndex = endIndex - this.OVERLAP_SIZE; // Create overlap
      
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
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let summary = response.text().trim();
      
      if (!summary) {
        throw new Error('Empty response from AI model');
      }

      // Validate that summary is actually shorter than original
      if (summary.length >= text.length) {
        this.logger.warn(`Summary is longer than original (${summary.length} vs ${text.length} chars). Requesting shorter version.`);
        
        // Try again with more strict requirements
        const strictPrompt = `
The previous summary was too long. Please create a much shorter summary of the following text.

STRICT Requirements:
- Maximum ${Math.floor(maxWords * 0.7)} words
- Maximum ${Math.floor(text.length * 0.5)} characters
- Must be significantly shorter than the original text
- Only include the most essential information

Text: ${text}

Short Summary:`;

        const retryResult = await this.model.generateContent(strictPrompt);
        const retryResponse = await retryResult.response;
        summary = retryResponse.text().trim();
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
        maxWords = Math.min(maxWords, Math.floor(maxWords * 0.5)); // Brief should be even shorter
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

    // Calculate character-based limits to ensure the summary is shorter
    const originalCharCount = text.length;
    const maxCharacters = Math.min(maxWords * 6, Math.floor(originalCharCount * 0.6)); // Ensure summary is at most 60% of original length

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