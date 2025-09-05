import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WorkspaceGroupServiceService } from './workspace-group-service.service';
import { CreateWorkspaceDto, JoinWorkspaceDto } from './dtos/workspace.dto';
import { WorkspaceExceptionFilter } from './filters/workspace-exception.filter';

@Controller()
@UseFilters(WorkspaceExceptionFilter)
export class WorkspaceGroupServiceController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly workspaceGroupServiceService: WorkspaceGroupServiceService) {}

  @MessagePattern('create_workspace')
  async createWorkspace(data: { userId: string; createWorkspaceDto: CreateWorkspaceDto }) {
    console.log('Received data in workspace service:', data);
    console.log('UserId:', data.userId);
    console.log('CreateWorkspaceDto:', data.createWorkspaceDto);
    return this.workspaceGroupServiceService.createWorkspace(data.userId, data.createWorkspaceDto);
  }

  @MessagePattern('join_workspace')
  async joinWorkspace(data: { userId: string; joinWorkspaceDto: JoinWorkspaceDto }) {
    try {
      console.log('Join workspace request received:', data);
      console.log('UserId:', data.userId);
      console.log('JoinWorkspaceDto:', data.joinWorkspaceDto);
      
      return await this.workspaceGroupServiceService.joinWorkspace(data.userId, data.joinWorkspaceDto);
    } catch (error) {
      console.error('Error in joinWorkspace controller:', error);
      // Re-throw the error to be handled by the API gateway
      throw error;
    }
  }

  @MessagePattern('get_user_workspaces')
  async getUserWorkspaces(data: { userId: string }) {
    return this.workspaceGroupServiceService.getUserWorkspaces(data.userId);
  }

  @MessagePattern('get_all_workspaces')
  async getAllWorkspaces() {
    return this.workspaceGroupServiceService.getAllWorkspaces();
  }

  @MessagePattern('check_membership_status')
  async checkMembershipStatus(data: { userId: string; workspaceId: string }) {
    try {
      console.log('Check membership status request:', data);
      return await this.workspaceGroupServiceService.checkMembershipStatus(data.userId, data.workspaceId);
    } catch (error) {
      console.error('Error in checkMembershipStatus controller:', error);
      throw error;
    }
  }

  @MessagePattern('get_workspace_details')
  async getWorkspaceDetails(data: { userId: string; workspaceId: string }) {
    try {
      console.log('Get workspace details request:', data);
      return await this.workspaceGroupServiceService.getWorkspaceById(data.workspaceId, data.userId);
    } catch (error) {
      console.error('Error in getWorkspaceDetails controller:', error);
      throw error;
    }
  }
}
