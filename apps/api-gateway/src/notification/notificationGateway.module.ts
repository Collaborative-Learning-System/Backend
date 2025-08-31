import { Module } from '@nestjs/common';
import { NotificationGatewayController } from './notificationGateway.controller';
import { NotificationGatewayService } from './notificationGateway.service';

@Module({
  controllers: [NotificationGatewayController],
  providers: [NotificationGatewayService],
})
export class NotificationModule {}
