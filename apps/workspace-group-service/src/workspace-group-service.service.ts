import { Injectable, ConflictException, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceMember } from './entities/workspace_user.entity';
import { Group } from './entities/group.entity';
import { GroupMember } from './entities/group-member.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { 
  CreateWorkspaceDto, 
  JoinWorkspaceDto, 
  LeaveWorkspaceDto,
  WorkspaceResponseDto, 
  UserWorkspacesResponseDto,
  AllWorkspacesResponseDto,
  CreateGroupDto,
  GroupResponseDto,
  WorkspaceGroupsResponseDto,
  JoinLeaveGroupDto,
  GroupActionResponseDto,
  SendChatMessageDto,
  ChatMessageResponseDto,
  GetChatHistoryDto,
  ChatHistoryResponseDto
} from './dtos/workspace.dto';

@Injectable()
export class WorkspaceGroupServiceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(WorkspaceMember)
    private workspaceMemberRepository: Repository<WorkspaceMember>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(GroupMember)
    private groupMemberRepository: Repository<GroupMember>,
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createWorkspace(userId: string, createWorkspaceDto: CreateWorkspaceDto): Promise<WorkspaceResponseDto> {
    console.log('Service method - userId:', userId);
    console.log('Service method - createWorkspaceDto:', createWorkspaceDto);
    
    // Temporary fix: use a test userId if the passed userId is undefined/null
    const finalUserId = userId || 'test-user-id-12345';
    console.log('Final userId to use:', finalUserId);
    
    try {
      // Create workspace
      const workspace = this.workspaceRepository.create({
        workspacename: createWorkspaceDto.workspacename,
        description: createWorkspaceDto.description,
      });

      const savedWorkspace = await this.workspaceRepository.save(workspace);
      console.log('Saved Workspace:', savedWorkspace);

      // Add creator as admin member
      const adminMember = this.workspaceMemberRepository.create({
        workspaceid: savedWorkspace.workspaceid,
        userid: finalUserId,
        role: 'admin',
      });
      
      console.log('Creating admin member:', adminMember);
      const savedMember = await this.workspaceMemberRepository.save(adminMember);
      console.log('Saved admin member:', savedMember);

      return {
        id: savedWorkspace.workspaceid,
        name: savedWorkspace.workspacename,
        description: savedWorkspace.description,
        adminId: finalUserId,
        role: 'admin',
      };
    } catch (error) {
      console.error('Error creating workspace:', error);
      throw new ConflictException('Failed to create workspace');
    }
  }

  async joinWorkspace(userId: string, joinWorkspaceDto: JoinWorkspaceDto): Promise<WorkspaceResponseDto> {
    const { workspaceId } = joinWorkspaceDto;

    // Validate input
    if (!userId || !workspaceId) {
      throw new BadRequestException('User ID and Workspace ID are required');
    }

    // Check if workspace exists
    const workspace = await this.workspaceRepository.findOne({
      where: { workspaceid: workspaceId },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    // Check if user is already a member
    const existingMember = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, userid: userId },
    });

    if (existingMember) {
      // Check if user is the admin (creator) of the workspace
      if (existingMember.role === 'admin') {
        throw new ConflictException('You cannot join a workspace that you created. You are already the admin of this workspace.');
      }
      // User is already a member
      throw new ConflictException('You have already joined this workspace.');
    }

    try {
      // Add user as member
      const member = this.workspaceMemberRepository.create({
        workspaceid: workspaceId,
        userid: userId,
        role: 'member',
      });

      await this.workspaceMemberRepository.save(member);
    } catch (error) {
      console.error('Error saving workspace member:', error);
      throw new ConflictException('Failed to join workspace. Please try again.');
    }

    // Get member count
    const memberCount = await this.workspaceMemberRepository.count({
      where: { workspaceid: workspaceId },
    });

    // Find admin to get adminId
    const adminMember = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, role: 'admin' },
    });

    return {
      id: workspace.workspaceid,
      name: workspace.workspacename,
      description: workspace.description,
      adminId: adminMember?.userid || '',
      memberCount,
      role: 'member',
    };
  }

  async leaveWorkspace(userId: string, leaveWorkspaceDto: LeaveWorkspaceDto): Promise<{ message: string }> {
    const { workspaceId } = leaveWorkspaceDto;

    // Validate input
    if (!userId || !workspaceId) {
      throw new BadRequestException('User ID and Workspace ID are required');
    }

    // Check if workspace exists
    const workspace = await this.workspaceRepository.findOne({
      where: { workspaceid: workspaceId },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    // Check if user is a member
    const membership = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, userid: userId },
    });

    if (!membership) {
      throw new BadRequestException('You are not a member of this workspace');
    }

    // Check if user is the admin - admins cannot leave their own workspace
    if (membership.role === 'admin') {
      throw new BadRequestException('Workspace admins cannot leave their own workspace. You must transfer admin rights or delete the workspace instead.');
    }

    try {
      // Remove user from workspace
      await this.workspaceMemberRepository.remove(membership);
      
      return {
        message: 'Successfully left the workspace'
      };
    } catch (error) {
      console.error('Error leaving workspace:', error);
      throw new ConflictException('Failed to leave workspace. Please try again.');
    }
  }

  async getUserWorkspaces(userId: string): Promise<UserWorkspacesResponseDto> {
    console.log('getUserWorkspaces called with userId:', userId);
    
    const userMemberships = await this.workspaceMemberRepository.find({
      where: { userid: userId },
    });
    
    console.log('Found memberships for user:', userMemberships);
    console.log('Number of memberships:', userMemberships.length);

    const workspaces = await Promise.all(
      userMemberships.map(async (membership) => {
        // Fetch workspace data using workspaceid
        const workspace = await this.workspaceRepository.findOne({
          where: { workspaceid: membership.workspaceid },
        });

        if (!workspace) {
          return null; // Skip if workspace not found
        }

        const memberCount = await this.workspaceMemberRepository.count({
          where: { workspaceid: membership.workspaceid },
        });

        // Find admin for this workspace
        const adminMember = await this.workspaceMemberRepository.findOne({
          where: { workspaceid: membership.workspaceid, role: 'admin' },
        });

        return {
          id: workspace.workspaceid,
          name: workspace.workspacename,
          description: workspace.description,
          adminId: adminMember?.userid || '',
          memberCount,
          role: membership.role,
        };
      })
    );

    // Filter out null values
    const validWorkspaces = workspaces.filter(workspace => workspace !== null);

    console.log('Final workspaces to return:', validWorkspaces);
    console.log('Total count:', validWorkspaces.length);

    return {
      workspaces: validWorkspaces,
      totalCount: validWorkspaces.length,
    };
  }

  async getWorkspaceById(workspaceId: string, userId: string): Promise<WorkspaceResponseDto> {
    const workspace = await this.workspaceRepository.findOne({
      where: { workspaceid: workspaceId },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    // Check if user is a member
    const membership = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, userid: userId },
    });

    if (!membership) {
      throw new BadRequestException('User is not a member of this workspace');
    }

    const memberCount = await this.workspaceMemberRepository.count({
      where: { workspaceid: workspaceId },
    });

    // Find admin for this workspace
    const adminMember = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, role: 'admin' },
    });

    return {
      id: workspace.workspaceid,
      name: workspace.workspacename,
      description: workspace.description,
      adminId: adminMember?.userid || '',
      memberCount,
      role: membership.role,
    };
  }

  async getAllWorkspaces(): Promise<AllWorkspacesResponseDto> {
    const workspaces = await this.workspaceRepository.find({
      select: ['workspaceid', 'workspacename'],
    });

    const workspaceList = workspaces.map(workspace => ({
      id: workspace.workspaceid,
      name: workspace.workspacename,
    }));

    return {
      workspaces: workspaceList,
      totalCount: workspaceList.length,
    };
  }

  async checkMembershipStatus(userId: string, workspaceId: string): Promise<{ isMember: boolean; role?: string; message: string }> {
    if (!userId || !workspaceId) {
      throw new BadRequestException('User ID and Workspace ID are required');
    }

    // Check if workspace exists
    const workspace = await this.workspaceRepository.findOne({
      where: { workspaceid: workspaceId },
    });

    if (!workspace) {
      return { 
        isMember: false, 
        message: 'Workspace not found' 
      };
    }

    // Check if user is a member
    const membership = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, userid: userId },
    });

    if (!membership) {
      return { 
        isMember: false, 
        message: 'User is not a member of this workspace' 
      };
    }

    return { 
      isMember: true, 
      role: membership.role,
      message: `User is a ${membership.role} of this workspace` 
    };
  }

  // Group-related methods
  async createGroup(userId: string, workspaceId: string, createGroupDto: CreateGroupDto): Promise<GroupResponseDto> {
    // Validate input
    if (!userId || !workspaceId) {
      throw new BadRequestException('User ID and Workspace ID are required');
    }

    // Check if workspace exists
    const workspace = await this.workspaceRepository.findOne({
      where: { workspaceid: workspaceId },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    // Check if user is a member of the workspace
    const membership = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, userid: userId },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this workspace');
    }

    // Check if user is admin of the workspace
    if (membership.role !== 'admin') {
      throw new ForbiddenException('Only workspace admins can create groups');
    }

    // Check if group name already exists in this workspace
    const existingGroup = await this.groupRepository.findOne({
      where: { workspaceid: workspaceId, groupname: createGroupDto.groupname },
    });

    if (existingGroup) {
      throw new ConflictException('A group with this name already exists in this workspace');
    }

    try {
      // Create group
      const group = this.groupRepository.create({
        workspaceid: workspaceId,
        groupname: createGroupDto.groupname,
        description: createGroupDto.description,
      });

      const savedGroup = await this.groupRepository.save(group);

      // Add the admin who created the group as a group member
      const groupMember = this.groupMemberRepository.create({
        groupid: savedGroup.groupid,
        userid: userId,
      });

      await this.groupMemberRepository.save(groupMember);

      return {
        id: savedGroup.groupid,
        name: savedGroup.groupname,
        description: savedGroup.description,
        workspaceId: savedGroup.workspaceid,
        isMember: true, // User who creates the group is automatically a member
      };
    } catch (error) {
      console.error('Error creating group:', error);
      throw new ConflictException('Failed to create group');
    }
  }

  async getWorkspaceGroups(userId: string, workspaceId: string): Promise<WorkspaceGroupsResponseDto> {
    // Validate input
    if (!userId || !workspaceId) {
      throw new BadRequestException('User ID and Workspace ID are required');
    }

    // Check if workspace exists
    const workspace = await this.workspaceRepository.findOne({
      where: { workspaceid: workspaceId },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    // Check if user is a member of the workspace
    const membership = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, userid: userId },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this workspace');
    }

    // Get all groups in the workspace
    const groups = await this.groupRepository.find({
      where: { workspaceid: workspaceId },
    });

    // Check membership status for each group
    const groupList = await Promise.all(
      groups.map(async (group) => {
        // Check if the user is a member of this group
        const groupMembership = await this.groupMemberRepository.findOne({
          where: { groupid: group.groupid, userid: userId },
        });

        return {
          id: group.groupid,
          name: group.groupname,
          description: group.description,
          workspaceId: group.workspaceid,
          isMember: !!groupMembership, // Convert to boolean
        };
      })
    );

    return {
      groups: groupList,
      totalCount: groupList.length,
    };
  }

  async joinLeaveGroup(userId: string, joinLeaveGroupDto: JoinLeaveGroupDto): Promise<GroupActionResponseDto> {
    const { groupId } = joinLeaveGroupDto;

    // Validate input
    if (!userId || !groupId) {
      throw new BadRequestException('User ID and Group ID are required');
    }

    // Check if group exists
    const group = await this.groupRepository.findOne({
      where: { groupid: groupId },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // Check if user is a member of the workspace that contains this group
    const workspaceMembership = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: group.workspaceid, userid: userId },
    });

    if (!workspaceMembership) {
      throw new ForbiddenException('You are not a member of the workspace that contains this group');
    }

    // Check if user is already a member of the group
    const groupMembership = await this.groupMemberRepository.findOne({
      where: { groupid: groupId, userid: userId },
    });

    try {
      if (groupMembership) {
        // User is a member, so leave the group
        await this.groupMemberRepository.remove(groupMembership);
        
        return {
          message: `Successfully left the group "${group.groupname}"`,
          action: 'left',
          groupId: group.groupid,
          groupName: group.groupname,
        };
      } else {
        // User is not a member, so join the group
        const newGroupMember = this.groupMemberRepository.create({
          groupid: groupId,
          userid: userId,
        });

        await this.groupMemberRepository.save(newGroupMember);

        return {
          message: `Successfully joined the group "${group.groupname}"`,
          action: 'joined',
          groupId: group.groupid,
          groupName: group.groupname,
        };
      }
    } catch (error) {
      console.error('Error in group join/leave operation:', error);
      throw new ConflictException('Failed to perform group operation. Please try again.');
    }
  }






  // ---------------------------------------------------------------------
  // Chat functionality methods
  async sendChatMessage(userId: string, sendChatMessageDto: SendChatMessageDto): Promise<ChatMessageResponseDto> {
    const { groupId, text } = sendChatMessageDto;

    try {
      // Verify that the group exists
      const group = await this.groupRepository.findOne({
        where: { groupid: groupId }
      });

      if (!group) {
        throw new NotFoundException(`Group with ID ${groupId} not found`);
      }

      // Verify that the user is a member of the group
      const groupMember = await this.groupMemberRepository.findOne({
        where: { groupid: groupId, userid: userId }
      });

      if (!groupMember) {
        throw new ForbiddenException('You must be a member of the group to send messages');
      }

      // Create and save the chat message
      const chatMessage = this.chatMessageRepository.create({
        groupid: groupId,
        userid: userId,
        text: text
      });

      const savedMessage = await this.chatMessageRepository.save(chatMessage);

      return {
        chatId: savedMessage.chatid,
        groupId: savedMessage.groupid,
        userId: savedMessage.userid,
        text: savedMessage.text,
        sentAt: savedMessage.sentat
      };
    } catch (error) {
      console.error('Error sending chat message:', error);
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new ConflictException('Failed to send message. Please try again.');
    }
  }

  async getChatHistory(userId: string, getChatHistoryDto: GetChatHistoryDto): Promise<ChatHistoryResponseDto> {
    const { groupId, limit = 50, offset = 0 } = getChatHistoryDto;

    try {
      // Verify that the group exists
      const group = await this.groupRepository.findOne({
        where: { groupid: groupId }
      });

      if (!group) {
        throw new NotFoundException(`Group with ID ${groupId} not found`);
      }

      // Verify that the user is a member of the group
      const groupMember = await this.groupMemberRepository.findOne({
        where: { groupid: groupId, userid: userId }
      });

      if (!groupMember) {
        throw new ForbiddenException('You must be a member of the group to view chat history');
      }

      // Get chat messages with pagination
      const [messages, totalCount] = await this.chatMessageRepository.findAndCount({
        where: { groupid: groupId },
        order: { sentat: 'DESC' },
        take: limit,
        skip: offset
      });

      const chatMessages: ChatMessageResponseDto[] = messages.map(message => ({
        chatId: message.chatid,
        groupId: message.groupid,
        userId: message.userid,
        text: message.text,
        sentAt: message.sentat
      }));

      return {
        messages: chatMessages,
        totalCount
      };
    } catch (error) {
      console.error('Error getting chat history:', error);
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new ConflictException('Failed to retrieve chat history. Please try again.');
    }
  }

  async getGroupMembers(groupId: string): Promise<string[]> {
    try {
      const groupMembers = await this.groupMemberRepository.find({
        where: { groupid: groupId }
      });

      return groupMembers.map(member => member.userid);
    } catch (error) {
      console.error('Error getting group members:', error);
      throw new ConflictException('Failed to get group members. Please try again.');
    }
  }
}
