import { Test, TestingModule } from '@nestjs/testing';
import { NotificationGatewayController } from './notificationGateway.controller';

describe('NotificationGatewayController', () => {
  let controller: NotificationGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationGatewayController],
    }).compile();

    controller = module.get<NotificationGatewayController>(
      NotificationGatewayController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
