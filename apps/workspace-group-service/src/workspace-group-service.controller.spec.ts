import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceGroupServiceController } from './workspace-group-service.controller';
import { WorkspaceGroupServiceService } from './workspace-group-service.service';

describe('WorkspaceGroupServiceController', () => {
  let workspaceGroupServiceController: WorkspaceGroupServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceGroupServiceController],
      providers: [WorkspaceGroupServiceService],
    }).compile();

    workspaceGroupServiceController = app.get<WorkspaceGroupServiceController>(WorkspaceGroupServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(workspaceGroupServiceController.getHello()).toBe('Hello World!');
    });
  });
});
