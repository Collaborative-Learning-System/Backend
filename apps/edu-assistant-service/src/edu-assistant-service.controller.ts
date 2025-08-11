import { Controller, Get } from '@nestjs/common';
import { EduAssistantServiceService } from './edu-assistant-service.service';

@Controller()
export class EduAssistantServiceController {
  constructor(private readonly eduAssistantServiceService: EduAssistantServiceService) {}

  @Get()
  getHello(): string {
    return this.eduAssistantServiceService.getHello();
  }
}
