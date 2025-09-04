import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WorkspaceGroupServiceService } from './workspace-group-service.service';
import { CreateWorkspaceDto, JoinWorkspaceDto } from './dtos/workspace.dto';

@Controller()
export class WorkspaceGroupServiceController {
  constructor(private readonly workspaceGroupServiceService: WorkspaceGroupServiceService) {}

  @MessagePattern('create_workspace')
  async createWorkspace(data: { userId: string; createWorkspaceDto: CreateWorkspaceDto }) {
    return this.workspaceGroupServiceService.createWorkspace(data.userId, data.createWorkspaceDto);
  }

  @MessagePattern('join_workspace')
  async joinWorkspace(data: { userId: string; joinWorkspaceDto: JoinWorkspaceDto }) {
    return this.workspaceGroupServiceService.joinWorkspace(data.userId, data.joinWorkspaceDto);
  }

  @MessagePattern('get_user_workspaces')
  async getUserWorkspaces(data: { userId: string }) {
    return this.workspaceGroupServiceService.getUserWorkspaces(data.userId);
  }

  @MessagePattern('get_workspace_by_id')
  async getWorkspaceById(data: { workspaceId: string; userId: string }) {
    return this.workspaceGroupServiceService.getWorkspaceById(data.workspaceId, data.userId);
  }
}
