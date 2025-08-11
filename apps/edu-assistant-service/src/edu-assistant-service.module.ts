import { Module } from '@nestjs/common';
import { EduAssistantServiceController } from './edu-assistant-service.controller';
import { EduAssistantServiceService } from './edu-assistant-service.service';

@Module({
  imports: [],
  controllers: [EduAssistantServiceController],
  providers: [EduAssistantServiceService],
})
export class EduAssistantServiceModule {}
