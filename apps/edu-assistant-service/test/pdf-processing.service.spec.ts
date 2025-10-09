import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PdfProcessingService } from '../src/services/pdf-processing.service';
import { DocumentSummarizationService } from '../src/services/document-summarization.service';
import { FileSummarizationDto } from '../src/dtos/file-summarization.dto';

// Mock pdf-parse to avoid file system issues in tests
jest.mock('pdf-parse', () => {
  return jest.fn(() => Promise.resolve({ text: 'Mocked PDF content' }));
});

describe('PdfProcessingService', () => {
  let service: PdfProcessingService;
  let mockDocumentSummarizationService: jest.Mocked<DocumentSummarizationService>;

  beforeEach(async () => {
    const mockSummarizationService = {
      summarizeText: jest.fn().mockResolvedValue({
        summary: 'Test summary',
        originalLength: 100,
        summaryLength: 50,
        processingTime: 1000,
        metadata: {
          summaryType: 'detailed',
          maxWords: 200,
          timestamp: new Date().toISOString(),
        },
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PdfProcessingService,
        {
          provide: DocumentSummarizationService,
          useValue: mockSummarizationService,
        },
      ],
    }).compile();

    service = module.get<PdfProcessingService>(PdfProcessingService);
    mockDocumentSummarizationService = module.get(DocumentSummarizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate file correctly', () => {
    const validFile: Express.Multer.File = {
      buffer: Buffer.from('test content'),
      originalname: 'test.txt',
      mimetype: 'text/plain',
      size: 1000,
      fieldname: 'file',
      encoding: '7bit',
      destination: '',
      filename: '',
      path: '',
      stream: null as any,
    };

    const fileInfo = service.getFileInfo(validFile);
    expect(fileInfo.isSupported).toBe(true);
    expect(fileInfo.isValidSize).toBe(true);
  });

  it('should reject unsupported file types', () => {
    const invalidFile: Express.Multer.File = {
      buffer: Buffer.from('test content'),
      originalname: 'test.doc',
      mimetype: 'application/msword',
      size: 1000,
      fieldname: 'file',
      encoding: '7bit',
      destination: '',
      filename: '',
      path: '',
      stream: null as any,
    };

    const fileInfo = service.getFileInfo(invalidFile);
    expect(fileInfo.isSupported).toBe(false);
  });

  it('should reject files that are too large', () => {
    const largeFile: Express.Multer.File = {
      buffer: Buffer.from('test content'),
      originalname: 'test.txt',
      mimetype: 'text/plain',
      size: 20 * 1024 * 1024, // 20MB
      fieldname: 'file',
      encoding: '7bit',
      destination: '',
      filename: '',
      path: '',
      stream: null as any,
    };

    const fileInfo = service.getFileInfo(largeFile);
    expect(fileInfo.isValidSize).toBe(false);
  });

  it('should process text file successfully', async () => {
    const longContent = 'This is a test document that needs to be summarized. '.repeat(10);
    const textFile: Express.Multer.File = {
      buffer: Buffer.from(longContent),
      originalname: 'test.txt',
      mimetype: 'text/plain',
      size: Buffer.from(longContent).length,
      fieldname: 'file',
      encoding: '7bit',
      destination: '',
      filename: '',
      path: '',
      stream: null as any,
    };

    const dto: FileSummarizationDto = {
      maxWords: 100,
      summaryType: 'brief',
    };

    const result = await service.processFile(textFile, dto);
    
    expect(result).toBeDefined();
    expect(result.summary).toBe('Test summary');
    expect(mockDocumentSummarizationService.summarizeText).toHaveBeenCalled();
  });
});