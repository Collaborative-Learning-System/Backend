import { Module } from '@nestjs/common';
import { WorkspaceGroupServiceController } from './workspace-group-service.controller';
import { WorkspaceGroupServiceService } from './workspace-group-service.service';

@Module({
  imports: [],
  controllers: [WorkspaceGroupServiceController],
  providers: [WorkspaceGroupServiceService],
})
export class WorkspaceGroupServiceModule {}
