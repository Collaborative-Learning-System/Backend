import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { DocumentSummarizationService } from './document-summarization.service';
import { FileSummarizationDto } from '../dtos/file-summarization.dto';
import { SummarizationResponseDto } from '../dtos/summarization-response.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfProcessingService {
  private readonly logger = new Logger(PdfProcessingService.name);
  
  // Supported file types
  private readonly SUPPORTED_MIME_TYPES = [
    // 'application/pdf', // Temporarily disabled due to module compatibility issues
    'text/plain',
  ];
  
  // File size limits (in bytes)
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private readonly MIN_FILE_SIZE = 20; // Reduced from 100 to 20 bytes for testing

  constructor(
    private readonly documentSummarizationService: DocumentSummarizationService,
  ) {}

  async processFile(
    file: Express.Multer.File,
    dto: FileSummarizationDto,
  ): Promise<SummarizationResponseDto> {
    const startTime = Date.now();
    
    try {
      // Validate file
      this.validateFile(file);
      
      // Debug file information
      this.logger.debug(`File object keys: ${Object.keys(file)}`);
      this.logger.debug(`File buffer exists: ${!!file.buffer}`);
      this.logger.debug(`File buffer is Buffer: ${Buffer.isBuffer(file.buffer)}`);
      this.logger.debug(`File buffer length: ${file.buffer?.length || 'undefined'}`);
      this.logger.debug(`File buffer constructor: ${file.buffer?.constructor?.name || 'undefined'}`);
      this.logger.debug(`File path: ${file.path || 'undefined'}`);
      this.logger.debug(`File destination: ${(file as any).destination || 'undefined'}`);
      this.logger.debug(`File filename: ${(file as any).filename || 'undefined'}`);
      this.logger.debug(`File storage type: ${file.buffer && file.buffer.length > 0 ? 'memory' : file.path ? 'disk' : 'unknown'}`);
      
      this.logger.log(`Processing file: ${file.originalname} (${file.size} bytes)`);
      
      // Extract text based on file type
      let extractedText: string;
      
      if (file.mimetype === 'application/pdf') {
        // PDF processing temporarily disabled
        throw new BadRequestException('PDF processing is temporarily unavailable. Please use text files.');
      } else if (file.mimetype === 'text/plain') {
        // Handle file reading - prioritize disk storage since that's what's actually happening
        if (file.path) {
          // Disk storage - file is saved to disk
          try {
            this.logger.debug(`Reading file from path: ${file.path}`);
            const fileContent = fs.readFileSync(file.path);
            extractedText = fileContent.toString('utf-8');
            
            // Clean up the temporary file
            fs.unlinkSync(file.path);
          } catch (error) {
            this.logger.error('Error reading file from disk:', error);
            throw new BadRequestException('Failed to read text file content from disk');
          }
        } else if ((file as any).destination && (file as any).filename) {
          // Alternative disk storage pattern
          try {
            const fullPath = path.join((file as any).destination, (file as any).filename);
            this.logger.debug(`Reading file from alternative path: ${fullPath}`);
            const fileContent = fs.readFileSync(fullPath);
            extractedText = fileContent.toString('utf-8');
            
            // Clean up the temporary file
            fs.unlinkSync(fullPath);
          } catch (error) {
            this.logger.error('Error reading file from alternative disk location:', error);
            throw new BadRequestException('Failed to read text file content from alternative disk location');
          }
        } else if (file.buffer) {
          // Memory storage - file is in buffer (fallback)
          try {
            // Check if buffer exists and has content
            if (Buffer.isBuffer(file.buffer)) {
              this.logger.debug(`Reading file from buffer (length: ${file.buffer.length})`);
              extractedText = file.buffer.toString('utf-8');
            } else if (file.buffer && typeof file.buffer === 'object') {
              // Sometimes buffer might be a different object type, try to convert
              this.logger.debug(`Converting non-Buffer object to Buffer`);
              extractedText = Buffer.from(file.buffer).toString('utf-8');
            } else {
              throw new Error('Buffer is not in expected format');
            }
          } catch (error) {
            this.logger.error('Error converting buffer to string:', error);
            this.logger.debug('Buffer type:', typeof file.buffer);
            this.logger.debug('Buffer content preview:', file.buffer);
            throw new BadRequestException('Failed to read text file content from buffer');
          }
        } else {
          // Try to handle other possible file object structures
          this.logger.error('File object structure not recognized:', JSON.stringify(file, null, 2));
          throw new BadRequestException(
            'Invalid file object: file data not accessible. ' +
            'Available properties: ' + Object.keys(file).join(', ')
          );
        }
      } else {
        throw new BadRequestException('Unsupported file type');
      }
      
      // Log extracted text for debugging
      this.logger.debug(`Raw extracted text length: ${extractedText?.length || 0}`);
      this.logger.debug(`Raw extracted text preview: "${extractedText?.substring(0, 100)}..."`);
      
      // Validate extracted text
      this.validateExtractedText(extractedText);
      
      this.logger.log(`Extracted ${extractedText.length} characters from ${file.originalname}`);
      
      // Create text summarization DTO
      const textSummarizationDto = {
        text: extractedText,
        maxWords: dto.maxWords || 200,
        summaryType: dto.summaryType || 'detailed',
        length: dto.length || 'medium',
        focus: dto.focus || 'general',
        tone: dto.tone || 'formal',
      };
      
      // Summarize the extracted text
      const result = await this.documentSummarizationService.summarizeText(textSummarizationDto);
      
      // Add file processing metadata
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
      
      // Use require for pdf-parse as it's a CommonJS module
      const pdfParse = require('pdf-parse');
      
      const data = await pdfParse(buffer, {
        // Configure pdf-parse options
        max: 0, // No page limit
        normalizeWhitespace: true,
      });
      
      if (!data.text || data.text.trim().length === 0) {
        throw new Error('No text content found in PDF');
      }
      
      // Clean up extracted text
      let cleanText = data.text
        .replace(/\r\n/g, '\n') // Normalize line endings
        .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
        .replace(/[ \t]{2,}/g, ' ') // Remove excessive spaces
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
    this.logger.debug(`Trimmed text length: ${trimmedText.length}`);
    this.logger.debug(`Original text length: ${text.length}`);
    
    if (trimmedText.length < 20) { // Reduced from 50 to 20 for testing
      throw new BadRequestException(
        `Text content too short for meaningful summarization (minimum 20 characters). ` +
        `Found: ${trimmedText.length} characters. Text preview: "${trimmedText.substring(0, 50)}"`
      );
    }
    
    // Check if text contains mostly special characters or numbers
    const alphaNumericCount = (trimmedText.match(/[a-zA-Z0-9]/g) || []).length;
    const alphaNumericRatio = alphaNumericCount / trimmedText.length;
    
    this.logger.debug(`AlphaNumeric ratio: ${alphaNumericRatio} (${alphaNumericCount}/${trimmedText.length})`);
    
    if (alphaNumericRatio < 0.3) { // Reduced from 0.5 to 0.3 for more flexibility
      throw new BadRequestException(
        `Text content appears to be invalid or corrupted. ` +
        `AlphaNumeric ratio: ${alphaNumericRatio.toFixed(2)} (minimum 0.3 required). ` +
        `Text preview: "${trimmedText.substring(0, 50)}"`
      );
    }
  }

  // Utility method to get file info without processing
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