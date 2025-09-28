import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WorkspaceGroupServiceService } from './workspace-group-service.service';
import { CreateWorkspaceDto, JoinWorkspaceDto, LeaveWorkspaceDto, CreateGroupDto, JoinLeaveGroupDto, SendChatMessageDto, GetChatHistoryDto } from './dtos/workspace.dto';
import { WorkspaceExceptionFilter } from './filters/workspace-exception.filter';

@Controller()
@UseFilters(WorkspaceExceptionFilter)
export class WorkspaceGroupServiceController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly workspaceGroupServiceService: WorkspaceGroupServiceService,
  ) {}

  @MessagePattern('create_workspace')
  async createWorkspace(data: {
    userId: string;
    createWorkspaceDto: CreateWorkspaceDto;
  }) {
    return this.workspaceGroupServiceService.createWorkspace(
      data.userId,
      data.createWorkspaceDto,
    );
  }

  @MessagePattern('join_workspace')
  async joinWorkspace(data: {
    userId: string;
    joinWorkspaceDto: JoinWorkspaceDto;
  }) {
    try {
      return await this.workspaceGroupServiceService.joinWorkspace(
        data.userId,
        data.joinWorkspaceDto,
      );
    } catch (error) {
      console.error('Error in joinWorkspace controller:', error);
      throw error;
    }
  }

  @MessagePattern('leave_workspace')
  async leaveWorkspace(data: {
    userId: string;
    leaveWorkspaceDto: LeaveWorkspaceDto;
  }) {
    try {
      return await this.workspaceGroupServiceService.leaveWorkspace(
        data.userId,
        data.leaveWorkspaceDto,
      );
    } catch (error) {
      console.error('Error in leaveWorkspace controller:', error);
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
      return await this.workspaceGroupServiceService.checkMembershipStatus(
        data.userId,
        data.workspaceId,
      );
    } catch (error) {
      console.error('Error in checkMembershipStatus controller:', error);
      throw error;
    }
  }

  @MessagePattern('get_workspace_details')
  async getWorkspaceDetails(data: { userId: string; workspaceId: string }) {
    try {
      console.log('Get workspace details request:', data);
      return await this.workspaceGroupServiceService.getWorkspaceById(
        data.workspaceId,
        data.userId,
      );
    } catch (error) {
      console.error('Error in getWorkspaceDetails controller:', error);
      throw error;
    }
  }

  @MessagePattern('create_group')
  async createGroup(data: {
    userId: string;
    workspaceId: string;
    createGroupDto: CreateGroupDto;
  }) {
    try {
      console.log('Create group request:', data);
      return await this.workspaceGroupServiceService.createGroup(
        data.userId,
        data.workspaceId,
        data.createGroupDto,
      );
    } catch (error) {
      console.error('Error in createGroup controller:', error);
      throw error;
    }
  }

  @MessagePattern('get_workspace_groups')
  async getWorkspaceGroups(data: { userId: string; workspaceId: string }) {
    try {
      console.log('Get workspace groups request:', data);
      return await this.workspaceGroupServiceService.getWorkspaceGroups(
        data.userId,
        data.workspaceId,
      );
    } catch (error) {
      console.error('Error in getWorkspaceGroups controller:', error);
      throw error;
    }
  }

  @MessagePattern('join_leave_group')
  async joinLeaveGroup(data: {
    userId: string;
    joinLeaveGroupDto: JoinLeaveGroupDto;
  }) {
    try {
      console.log('Join/Leave group request:', data);
      return await this.workspaceGroupServiceService.joinLeaveGroup(
        data.userId,
        data.joinLeaveGroupDto,
      );
    } catch (error) {
      console.error('Error in joinLeaveGroup controller:', error);
      throw error;
    }
  }

  @MessagePattern('get-group-members')
  async getGroupMembersOld(data: { groupId: string }) {
    try {
      console.log('Get group members request:', data);
      return await this.workspaceGroupServiceService.fetchGroupMembers(
        data.groupId,
      );
    } catch (error) {
      console.error('Error in getGroupMembersOld controller:', error);
      throw error;
    }
  }

  // Socket.IO Chat
  @MessagePattern('send_chat_message')
  async sendChatMessage(data: {
    userId: string;
    sendChatMessageDto: SendChatMessageDto;
  }) {
    try {
      return await this.workspaceGroupServiceService.sendChatMessage(
        data.userId,
        data.sendChatMessageDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('get_chat_history')
  async getChatHistory(data: {
    userId: string;
    getChatHistoryDto: GetChatHistoryDto;
  }) {
    try {
      console.log('Get chat history request:', data);
      return await this.workspaceGroupServiceService.getChatHistory(
        data.userId,
        data.getChatHistoryDto,
      );
    } catch (error) {
      console.error('Error in getChatHistory controller:', error);
      throw error;
    }
  }

  @MessagePattern('get_group_members')
  async getGroupMembers(data: { groupId: string }) {
    try {
      console.log('Get group members request:', data);
      return await this.workspaceGroupServiceService.getGroupMembers(
        data.groupId,
      );
    } catch (error) {
      console.error('Error in getGroupMembers controller:', error);
      throw error;
    }
  }
}
