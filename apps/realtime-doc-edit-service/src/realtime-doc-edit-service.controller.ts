import { Controller, Get } from '@nestjs/common';
import { RealtimeDocEditServiceService } from './realtime-doc-edit-service.service';

@Controller('documents')
export class RealtimeDocEditServiceController {
  constructor(private readonly realtimeDocEditServiceService: RealtimeDocEditServiceService) {}


}
