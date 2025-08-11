import { Test, TestingModule } from '@nestjs/testing';
import { EduAssistantServiceController } from './edu-assistant-service.controller';
import { EduAssistantServiceService } from './edu-assistant-service.service';

describe('EduAssistantServiceController', () => {
  let eduAssistantServiceController: EduAssistantServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EduAssistantServiceController],
      providers: [EduAssistantServiceService],
    }).compile();

    eduAssistantServiceController = app.get<EduAssistantServiceController>(EduAssistantServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(eduAssistantServiceController.getHello()).toBe('Hello World!');
    });
  });
});
