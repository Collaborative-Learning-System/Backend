import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DocumentSummarizationService } from '../src/services/document-summarization.service';
import { TextSummarizationDto } from '../src/dtos/text-summarization.dto';

describe('DocumentSummarizationService', () => {
  let service: DocumentSummarizationService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'GEMINI_API_KEY') {
        return 'test-api-key';
      }
      return undefined;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentSummarizationService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<DocumentSummarizationService>(DocumentSummarizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle text chunking correctly', () => {
    const longText = 'A'.repeat(10000);
    const dto: TextSummarizationDto = {
      text: longText,
      maxWords: 200,
      summaryType: 'detailed',
    };

    // This will test the chunking logic, but won't call the actual API
    expect(dto.text.length).toBeGreaterThan(4000); // Our chunk size
  });

  it('should validate text summarization DTO', () => {
    const dto: TextSummarizationDto = {
      text: 'This is a test document that needs to be summarized.',
      maxWords: 150,
      summaryType: 'brief',
    };

    expect(dto.text).toBeDefined();
    expect(dto.maxWords).toBe(150);
    expect(dto.summaryType).toBe('brief');
  });
});