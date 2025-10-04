import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Readable } from 'stream';
import { EduAssistantServiceService } from './edu-assistant-service.service';
import { GenerateStudyPlanDto } from './dtos/generate-study-plan.dto';
import { DocumentSummarizationService } from './services/document-summarization.service';
import { PdfProcessingService } from './services/pdf-processing.service';
import { TextSummarizationDto } from './dtos/text-summarization.dto';

@Controller()
export class EduAssistantServiceController {
  constructor(
    private readonly eduAssistantServiceService: EduAssistantServiceService,
    private readonly documentSummarizationService: DocumentSummarizationService,
    private readonly pdfProcessingService: PdfProcessingService,
  ) {}

 

  @MessagePattern({ cmd: 'generate-study-plan' })
  async generateStudyPlan(generateStudyPlanDto: GenerateStudyPlanDto) {
    try {
      const result = await this.eduAssistantServiceService.generateStudyPlan(generateStudyPlanDto);
      return {
        success: true,
        data: result,
        message: 'Study plan generated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to generate study plan',
        error: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'get-study-plan' })
  async getStudyPlan(data: { id: number }) {
    try {
      const result = await this.eduAssistantServiceService.getStudyPlan(data.id);
      return {
        success: true,
        data: result,
        message: 'Study plan retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to retrieve study plan',
        error: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'get-study-plans-by-user' })
  async getStudyPlansByUserId(data: { userId: string }) {
    try {
      const result = await this.eduAssistantServiceService.getStudyPlansByUserId(data.userId);
      return {
        success: true,
        data: result,
        message: 'Study plans retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to retrieve study plans',
        error: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'delete-study-plan' })
  async deleteStudyPlan(data: { id: number }) {
    try {
      await this.eduAssistantServiceService.deleteStudyPlan(data.id);
      return {
        success: true,
        message: 'Study plan deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to delete study plan',
        error: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'summarize-text' })
  async summarizeText(textSummarizationDto: TextSummarizationDto) {
    try {
      const result = await this.documentSummarizationService.summarizeText(textSummarizationDto);
      return {
        success: true,
        data: result,
        message: 'Text summarization completed successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to summarize text',
        error: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'summarize-file' })
  async summarizeFile(data: { fileBuffer: Buffer; fileName: string; mimeType: string; options?: any }) {
    try {
      // Create a mock Express.Multer.File object
      const file: Express.Multer.File = {
        buffer: data.fileBuffer,
        originalname: data.fileName,
        mimetype: data.mimeType,
        size: data.fileBuffer.length,
        fieldname: 'file',
        encoding: '7bit',
        destination: '',
        filename: '',
        path: '',
        stream: new Readable(),
      };

      const options = data.options || { maxWords: 200, summaryType: 'detailed' };
      
      const result = await this.pdfProcessingService.processFile(file, options);
      return {
        success: true,
        data: result,
        message: 'File summarization completed successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to summarize file',
        error: error.message,
      };
    }
  }
}