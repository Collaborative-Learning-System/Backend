import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
  Logger,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { DocumentSummarizationService } from '../services/document-summarization.service';
import { PdfProcessingService } from '../services/pdf-processing.service';
import { TextSummarizationDto } from '../dtos/text-summarization.dto';
import { FileSummarizationDto } from '../dtos/file-summarization.dto';
import { SummarizationResponseDto, ErrorResponseDto } from '../dtos/summarization-response.dto';

@Controller('summarize')
export class SummarizationController {
  private readonly logger = new Logger(SummarizationController.name);

  constructor(
    private readonly documentSummarizationService: DocumentSummarizationService,
    private readonly pdfProcessingService: PdfProcessingService,
  ) {}

  @Post('text')
  async summarizeText(
    @Body() dto: TextSummarizationDto,
  ): Promise<SummarizationResponseDto> {
    try {
      this.logger.log('Text summarization request received');
      
      if (!dto.text || dto.text.trim().length === 0) {
        throw new HttpException(
          'Text content is required and cannot be empty',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.documentSummarizationService.summarizeText(dto);
      
      this.logger.log('Text summarization completed successfully');
      return result;
      
    } catch (error) {
      this.logger.error('Text summarization failed:', error);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        {
          message: 'Text summarization failed',
          error: error.message,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          timestamp: new Date().toISOString(),
        } as ErrorResponseDto,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(), // Explicitly use memory storage
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (req, file, callback) => {
      const allowedMimeTypes = ['application/pdf', 'text/plain'];
      if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(
          new HttpException(
            `Unsupported file type: ${file.mimetype}. Allowed types: ${allowedMimeTypes.join(', ')}`,
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
    },
  }))
  async summarizeFile(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: FileSummarizationDto,
  ): Promise<SummarizationResponseDto> {
    try {
      this.logger.log(`File summarization request received: ${file?.originalname}`);
      
      if (!file) {
        throw new HttpException(
          'File is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Convert query params to proper types
      const dto: FileSummarizationDto = {
        maxWords: query.maxWords ? parseInt(query.maxWords.toString(), 10) : 200,
        summaryType: query.summaryType || 'detailed',
        length: query.length || 'medium',
        focus: query.focus || 'general',
        tone: query.tone || 'formal',
      };

      // Validate maxWords if provided
      if (dto.maxWords && (dto.maxWords < 50 || dto.maxWords > 1000)) {
        throw new HttpException(
          'maxWords must be between 50 and 1000',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.pdfProcessingService.processFile(file, dto);
      
      this.logger.log(`File summarization completed successfully: ${file.originalname}`);
      return result;
      
    } catch (error) {
      this.logger.error(`File summarization failed for ${file?.originalname}:`, error);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        {
          message: 'File summarization failed',
          error: error.message,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          timestamp: new Date().toISOString(),
        } as ErrorResponseDto,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('file-info')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(), // Explicitly use memory storage
  }))
  async getFileInfo(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      if (!file) {
        throw new HttpException(
          'File is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const fileInfo = this.pdfProcessingService.getFileInfo(file);
      
      return {
        success: true,
        data: fileInfo,
        timestamp: new Date().toISOString(),
      };
      
    } catch (error) {
      this.logger.error('Get file info failed:', error);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        'Failed to get file information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}