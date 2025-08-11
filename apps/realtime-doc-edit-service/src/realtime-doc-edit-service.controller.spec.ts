import { Test, TestingModule } from '@nestjs/testing';
import { RealtimeDocEditServiceController } from './realtime-doc-edit-service.controller';
import { RealtimeDocEditServiceService } from './realtime-doc-edit-service.service';

describe('RealtimeDocEditServiceController', () => {
  let realtimeDocEditServiceController: RealtimeDocEditServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RealtimeDocEditServiceController],
      providers: [RealtimeDocEditServiceService],
    }).compile();

    realtimeDocEditServiceController = app.get<RealtimeDocEditServiceController>(RealtimeDocEditServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(realtimeDocEditServiceController.getHello()).toBe('Hello World!');
    });
  });
});
