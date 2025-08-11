import { Controller, Get } from '@nestjs/common';
import { RealtimeDocEditServiceService } from './realtime-doc-edit-service.service';

@Controller()
export class RealtimeDocEditServiceController {
  constructor(private readonly realtimeDocEditServiceService: RealtimeDocEditServiceService) {}

  @Get()
  getHello(): string {
    return this.realtimeDocEditServiceService.getHello();
  }
}
