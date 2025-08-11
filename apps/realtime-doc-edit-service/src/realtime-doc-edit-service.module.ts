import { Module } from '@nestjs/common';
import { RealtimeDocEditServiceController } from './realtime-doc-edit-service.controller';
import { RealtimeDocEditServiceService } from './realtime-doc-edit-service.service';

@Module({
  imports: [],
  controllers: [RealtimeDocEditServiceController],
  providers: [RealtimeDocEditServiceService],
})
export class RealtimeDocEditServiceModule {}
