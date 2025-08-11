import { Controller, Get } from '@nestjs/common';
import { WorkspaceGroupServiceService } from './workspace-group-service.service';

@Controller()
export class WorkspaceGroupServiceController {
  constructor(private readonly workspaceGroupServiceService: WorkspaceGroupServiceService) {}

  @Get()
  getHello(): string {
    return this.workspaceGroupServiceService.getHello();
  }
}
