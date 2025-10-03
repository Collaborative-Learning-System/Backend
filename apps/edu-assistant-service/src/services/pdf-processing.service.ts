import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { DocumentSummarizationService } from './document-summarization.service';
import { FileSummarizationDto } from '../dtos/file-summarization.dto';
import { SummarizationResponseDto } from '../dtos/summarization-response.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfProcessingService {
  private readonly logger = new Logger(PdfProcessingService.name);
  
  private readonly SUPPORTED_MIME_TYPES = [
    'application/pdf', 
    'text/plain',
  ];
  
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024;
  private readonly MIN_FILE_SIZE = 20; 

  constructor(
    private readonly documentSummarizationService: DocumentSummarizationService,
  ) {}

  async processFile(
    file: Express.Multer.File,
    dto: FileSummarizationDto,
  ): Promise<SummarizationResponseDto> {
    const startTime = Date.now();
    
    try {
      this.validateFile(file);
      
      this.logger.log(`Processing file: ${file.originalname} (${file.size} bytes)`);
      
      let extractedText: string;
      
      if (file.mimetype === 'application/pdf') {
        if (file.buffer) {
          try {
            extractedText = await this.extractTextFromPdf(file.buffer);
          } catch (error) {
            this.logger.error('Error processing PDF from buffer:', error);
            throw new BadRequestException('Failed to extract text from PDF buffer');
          }
        } else if (file.path) {
          try {
            const fileBuffer = fs.readFileSync(file.path);
            extractedText = await this.extractTextFromPdf(fileBuffer);
            fs.unlinkSync(file.path);
          } catch (error) {
            this.logger.error('Error reading PDF file from disk:', error);
            throw new BadRequestException('Failed to read PDF file content from disk');
          }
        } else if ((file as any).destination && (file as any).filename) {
          try {
            const fullPath = path.join((file as any).destination, (file as any).filename);
            const fileBuffer = fs.readFileSync(fullPath);
            extractedText = await this.extractTextFromPdf(fileBuffer);
            fs.unlinkSync(fullPath);
          } catch (error) {
            this.logger.error('Error reading PDF file from alternative disk location:', error);
            throw new BadRequestException('Failed to read PDF file content from alternative disk location');
          }
        } else {
          throw new BadRequestException(
            'Invalid PDF file object: file data not accessible. ' +
            'Available properties: ' + Object.keys(file).join(', ')
          );
        }
      } else if (file.mimetype === 'text/plain') {
        if (file.path) {
          try {
            const fileContent = fs.readFileSync(file.path);
            extractedText = fileContent.toString('utf-8');
            fs.unlinkSync(file.path);
          } catch (error) {
            this.logger.error('Error reading file from disk:', error);
            throw new BadRequestException('Failed to read text file content from disk');
          }
        } else if ((file as any).destination && (file as any).filename) {
          try {
            const fullPath = path.join((file as any).destination, (file as any).filename);
            const fileContent = fs.readFileSync(fullPath);
            extractedText = fileContent.toString('utf-8');
            fs.unlinkSync(fullPath);
          } catch (error) {
            this.logger.error('Error reading file from alternative disk location:', error);
            throw new BadRequestException('Failed to read text file content from alternative disk location');
          }
        } else if (file.buffer) {
          try {
            if (Buffer.isBuffer(file.buffer)) {
              extractedText = file.buffer.toString('utf-8');
            } else if (file.buffer && typeof file.buffer === 'object') {
              extractedText = Buffer.from(file.buffer).toString('utf-8');
            } else {
              throw new Error('Buffer is not in expected format');
            }
          } catch (error) {
            this.logger.error('Error converting buffer to string:', error);
            throw new BadRequestException('Failed to read text file content from buffer');
          }
        } else {
          throw new BadRequestException(
            'Invalid file object: file data not accessible. ' +
            'Available properties: ' + Object.keys(file).join(', ')
          );
        }
      } else {
        throw new BadRequestException('Unsupported file type');
      }
      
      this.validateExtractedText(extractedText);
      
      this.logger.log(`Extracted ${extractedText.length} characters from ${file.originalname}`);
      
      const textSummarizationDto = {
        text: extractedText,
        maxWords: dto.maxWords || 200,
        summaryType: dto.summaryType || 'detailed',
        length: dto.length || 'medium',
        focus: dto.focus || 'general',
        tone: dto.tone || 'formal',
      };
      
      const result = await this.documentSummarizationService.summarizeText(textSummarizationDto);
      
      result.metadata = {
        ...result.metadata,
        fileName: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
        extractionTime: Date.now() - startTime,
      };
      
      return result;
      
    } catch (error) {
      this.logger.error(`Error processing file ${file?.originalname}:`, error);
      
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      throw new BadRequestException(`File processing failed: ${error.message}`);
    }
  }

  private validateFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    
    if (!this.SUPPORTED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Unsupported file type: ${file.mimetype}. Supported types: ${this.SUPPORTED_MIME_TYPES.join(', ')}`
      );
    }
    
    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException(
        `File too large. Maximum size: ${this.MAX_FILE_SIZE / (1024 * 1024)}MB`
      );
    }
    
    if (file.size < this.MIN_FILE_SIZE) {
      throw new BadRequestException('File too small');
    }
  }

  private async extractTextFromPdf(buffer: Buffer): Promise<string> {
    try {
      this.logger.log('Extracting text from PDF...');
      
      const pdfParse = require('pdf-parse');
      
      const data = await pdfParse(buffer, {
        max: 0,
        normalizeWhitespace: true,
      });
      
      if (!data.text || data.text.trim().length === 0) {
        throw new Error('No text content found in PDF');
      }
      
      let cleanText = data.text
        .replace(/\r\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/[ \t]{2,}/g, ' ')
        .trim();
      
      this.logger.log(`Successfully extracted text from PDF: ${cleanText.length} characters`);
      
      return cleanText;
      
    } catch (error) {
      this.logger.error('PDF text extraction failed:', error);
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }

  private validateExtractedText(text: string): void {
    if (!text || text.trim().length === 0) {
      throw new BadRequestException('No text content found in the file');
    }
    
    const trimmedText = text.trim();
    
    if (trimmedText.length < 20) {
      throw new BadRequestException(
        `Text content too short for meaningful summarization (minimum 20 characters). ` +
        `Found: ${trimmedText.length} characters. Text preview: "${trimmedText.substring(0, 50)}"`
      );
    }
    
    const alphaNumericCount = (trimmedText.match(/[a-zA-Z0-9]/g) || []).length;
    const alphaNumericRatio = alphaNumericCount / trimmedText.length;
    
    if (alphaNumericRatio < 0.3) {
      throw new BadRequestException(
        `Text content appears to be invalid or corrupted. ` +
        `AlphaNumeric ratio: ${alphaNumericRatio.toFixed(2)} (minimum 0.3 required). ` +
        `Text preview: "${trimmedText.substring(0, 50)}"`
      );
    }
  }

  getFileInfo(file: Express.Multer.File): any {
    return {
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      sizeInMB: (file.size / (1024 * 1024)).toFixed(2),
      isSupported: this.SUPPORTED_MIME_TYPES.includes(file.mimetype),
      isValidSize: file.size >= this.MIN_FILE_SIZE && file.size <= this.MAX_FILE_SIZE,
    };
  }
}