import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
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
  ChatHistoryResponseDto,
  AssignAdminDto,
  AddMemberDto,
} from './dtos/workspace.dto';
import { ClientProxy } from '@nestjs/microservices';

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
    @Inject('auth-service')
    private readonly authClient: ClientProxy,
    @Inject('notification-service')
    private readonly notificationClient: ClientProxy,
  ) {}

  async createWorkspace(
    userId: string,
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    // Temporary fix: use a test userId if the passed userId is undefined/null
    const finalUserId = userId || 'test-user-id-12345';

    try {
      const workspace = this.workspaceRepository.create({
        workspacename: createWorkspaceDto.workspacename,
        description: createWorkspaceDto.description,
      });

      const savedWorkspace = await this.workspaceRepository.save(workspace);

      const adminMember = this.workspaceMemberRepository.create({
        workspaceid: savedWorkspace.workspaceid,
        userid: userId,
        role: 'admin',
      });

      const admin = await this.workspaceMemberRepository.findOne({
        where: { workspaceid: savedWorkspace.workspaceid, role: 'admin' },
        relations: ['user'],
      });

      await this.workspaceMemberRepository.save(adminMember);

      return {
        id: savedWorkspace.workspaceid,
        name: savedWorkspace.workspacename,
        description: savedWorkspace.description,
        adminId: finalUserId,
        adminName: admin?.user?.fullName || 'Unknown Admin',
        role: 'admin',
      };
    } catch (error) {
      throw new ConflictException('Failed to create workspace');
    }
  }

  async joinWorkspace(
    userId: string,
    joinWorkspaceDto: JoinWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
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
        throw new ConflictException(
          'You cannot join a workspace that you created. You are already the admin of this workspace.',
        );
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
      throw new ConflictException(
        'Failed to join workspace. Please try again.',
      );
    }

    // Get member count
    const memberCount = await this.workspaceMemberRepository.count({
      where: { workspaceid: workspaceId },
    });

    // Find admin to get adminId
    const adminMember = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, role: 'admin' },
      relations: ['user'],
    });

    return {
      id: workspace.workspaceid,
      name: workspace.workspacename,
      description: workspace.description,
      adminId: adminMember?.userid || '',
      adminName: adminMember?.user?.fullName || 'Unknown Admin',
      memberCount,
      role: 'member',
    };
  }

  async leaveWorkspace(
    userId: string,
    leaveWorkspaceDto: LeaveWorkspaceDto,
  ): Promise<{ message: string }> {
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
      throw new BadRequestException(
        'Workspace admins cannot leave their own workspace. You must transfer admin rights or delete the workspace instead.',
      );
    }

    try {
      // Remove user from workspace
      await this.workspaceMemberRepository.remove(membership);

      return {
        message: 'Successfully left the workspace',
      };
    } catch (error) {
      throw new ConflictException(
        'Failed to leave workspace. Please try again.',
      );
    }
  }

  async getUserWorkspaces(userId: string): Promise<UserWorkspacesResponseDto> {
    const userMemberships = await this.workspaceMemberRepository.find({
      where: { userid: userId },
    });

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
          relations: ['user'],
        });

        return {
          id: workspace.workspaceid,
          name: workspace.workspacename,
          description: workspace.description,
          adminId: adminMember?.userid || '',
          adminName: adminMember?.user?.fullName || 'Unknown Admin',
          memberCount,
          role: membership.role,
        };
      }),
    );

    // Filter out null values
    const validWorkspaces = workspaces.filter(
      (workspace) => workspace !== null,
    );

    return {
      workspaces: validWorkspaces,
      totalCount: validWorkspaces.length,
    };
  }

  async getWorkspaceById(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceResponseDto> {
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
      relations: ['user'],
    });

    return {
      id: workspace.workspaceid,
      name: workspace.workspacename,
      description: workspace.description,
      adminId: adminMember?.userid || '',
      adminName: adminMember?.user?.fullName || 'Unknown Admin',
      memberCount,
      role: membership.role,
    };
  }

  async getAllWorkspaces(): Promise<AllWorkspacesResponseDto> {
    const workspaces = await this.workspaceRepository.find({
      select: ['workspaceid', 'workspacename'],
    });

    const workspaceList = workspaces.map((workspace) => ({
      id: workspace.workspaceid,
      name: workspace.workspacename,
    }));

    return {
      workspaces: workspaceList,
      totalCount: workspaceList.length,
    };
  }

  async checkMembershipStatus(
    userId: string,
    workspaceId: string,
  ): Promise<{ isMember: boolean; role?: string; message: string }> {
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
        message: 'Workspace not found',
      };
    }

    // Check if user is a member
    const membership = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, userid: userId },
    });

    if (!membership) {
      return {
        isMember: false,
        message: 'User is not a member of this workspace',
      };
    }

    return {
      isMember: true,
      role: membership.role,
      message: `User is a ${membership.role} of this workspace`,
    };
  }

  // Get Workspace Members
  async getWorkspaceMembers(workspaceId: string) {
    const members = await this.workspaceMemberRepository.find({
      where: { workspaceid: workspaceId },
      relations: ['user'],
    });

    return members.map((member) => ({
      userId: member.userid,
      name: member.user?.fullName || 'Unknown User',
    }));
  }

  // Grant Admin Role
  async assignAdmin(assignAdminDto: AssignAdminDto) {
    console.log(assignAdminDto);
    const { workspaceId, newAdminId } = assignAdminDto;

    // Validate input
    if (!workspaceId || !newAdminId) {
      return {
        success: false,
        message: 'Workspace ID and User ID are required',
      };
    }

    // Check if workspace exists
    const workspace = await this.workspaceRepository.findOne({
      where: { workspaceid: workspaceId },
    });

    if (!workspace) {
      return {
        success: false,
        message: 'Workspace not found',
      };
    }

    // Check if user is a member of the workspace
    const membership = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, userid: newAdminId },
    });
    if (!membership) {
      return {
        success: false,
        message: 'User is not a member of this workspace',
      };
    }

    const currentAdmin = await this.workspaceMemberRepository.findOne({
      where: { workspaceid: workspaceId, role: 'admin' },
    });

    if (currentAdmin && currentAdmin.userid === newAdminId) {
      return {
        success: false,
        message: 'User is already the admin of this workspace',
      };
    }

    await this.workspaceMemberRepository.update(
      { workspaceid: workspaceId, userid: currentAdmin?.userid },
      { role: 'member' },
    );

    await this.workspaceMemberRepository.update(
      { workspaceid: workspaceId, userid: newAdminId },
      { role: 'admin' },
    );

    return {
      success: true,
      message: 'Admin role assigned successfully',
    };
  }
  async addMembers(addMembersDto: AddMemberDto) {
    try {
      const { workspaceId, emails, workspaceName } = addMembersDto;
      const failUsers: string[] = [];
      const alreadyMembers: string[] = [];
      let successUsers: string[] = [];

      await Promise.all(
        emails.map(async (email) => {
          const result = await this.authClient
            .send({ cmd: 'find-user-by-email' }, email)
            .toPromise();

          if (result.success) {
            const isUser = await this.workspaceMemberRepository.findOne({
              where: { userid: result.data.userId, workspaceid: workspaceId },
            });

            if (isUser) {
              alreadyMembers.push(email);
              return;
            }

            const member = this.workspaceMemberRepository.create({
              userid: result.data.userId,
              workspaceid: workspaceId,
              role: 'member',
            });

            successUsers.push(result.data.userId);

            await this.workspaceMemberRepository.save(member);
          } else {
            failUsers.push(email);
          }
        }),
      );

      if (successUsers.length > 0) {
        const notificationPayload = {
          users: successUsers,
          notification: `You have been added to a new workspace: ${workspaceName}.`,
          timestamp: new Date().toISOString(),
          isRead: false,
          link: `/workspace/${workspaceId}`,
        };

        try {
          // Send notification to the user
          await this.notificationClient
            .send({ cmd: 'send-notifications' }, notificationPayload)
            .toPromise();
        } catch (error) {
          console.error('Failed to send notification:', error);
        }
      }

      return {
        success: true,
        data: {
          failedUsers: failUsers,
          alreadyMembers: alreadyMembers,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Failed to add members. Please try again.',
      };
    }
  }

  // Group-related methods
  async createGroup(
    userId: string,
    workspaceId: string,
    createGroupDto: CreateGroupDto,
  ): Promise<GroupResponseDto> {
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
      throw new ConflictException(
        'A group with this name already exists in this workspace',
      );
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
      throw new ConflictException('Failed to create group');
    }
  }

  async getWorkspaceGroups(
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceGroupsResponseDto> {
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
      }),
    );

    return {
      groups: groupList,
      totalCount: groupList.length,
    };
  }

  async joinLeaveGroup(
    userId: string,
    joinLeaveGroupDto: JoinLeaveGroupDto,
  ): Promise<GroupActionResponseDto> {
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
      throw new ForbiddenException(
        'You are not a member of the workspace that contains this group',
      );
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
      throw new ConflictException(
        'Failed to perform group operation. Please try again.',
      );
    }
  }

  // Chat functionality methods
  async sendChatMessage(
    userId: string,
    sendChatMessageDto: SendChatMessageDto,
  ): Promise<ChatMessageResponseDto> {
    const { groupId, text } = sendChatMessageDto;

    try {
      // Verify that the group exists
      const group = await this.groupRepository.findOne({
        where: { groupid: groupId },
      });

      if (!group) {
        throw new NotFoundException(`Group with ID ${groupId} not found`);
      }

      // Verify that the user is a member of the group
      const groupMember = await this.groupMemberRepository.findOne({
        where: { groupid: groupId, userid: userId },
      });

      if (!groupMember) {
        throw new ForbiddenException(
          'You must be a member of the group to send messages',
        );
      }

      // Create and save the chat message
      const chatMessage = this.chatMessageRepository.create({
        groupid: groupId,
        userid: userId,
        text: text,
      });

      const savedMessage = await this.chatMessageRepository.save(chatMessage);

      return {
        chatId: savedMessage.chatid,
        groupId: savedMessage.groupid,
        userId: savedMessage.userid,
        text: savedMessage.text,
        sentAt: savedMessage.sentat,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new ConflictException('Failed to send message. Please try again.');
    }
  }

  async getChatHistory(
    userId: string,
    getChatHistoryDto: GetChatHistoryDto,
  ): Promise<ChatHistoryResponseDto> {
    const { groupId, limit = 50, offset = 0 } = getChatHistoryDto;

    try {
      // Verify that the group exists
      const group = await this.groupRepository.findOne({
        where: { groupid: groupId },
      });

      if (!group) {
        throw new NotFoundException(`Group with ID ${groupId} not found`);
      }

      // Verify that the user is a member of the group
      const groupMember = await this.groupMemberRepository.findOne({
        where: { groupid: groupId, userid: userId },
      });

      if (!groupMember) {
        throw new ForbiddenException(
          'You must be a member of the group to view chat history',
        );
      }

      // Get chat messages with pagination
      const [messages, totalCount] =
        await this.chatMessageRepository.findAndCount({
          where: { groupid: groupId },
          order: { sentat: 'DESC' },
          take: limit,
          skip: offset,
        });

      const chatMessages: ChatMessageResponseDto[] = messages.map(
        (message) => ({
          chatId: message.chatid,
          groupId: message.groupid,
          userId: message.userid,
          text: message.text,
          sentAt: message.sentat,
        }),
      );

      return {
        messages: chatMessages,
        totalCount,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new ConflictException(
        'Failed to retrieve chat history. Please try again.',
      );
    }
  }

  async getGroupMembers(groupId: string): Promise<string[]> {
    try {
      const groupMembers = await this.groupMemberRepository.find({
        where: { groupid: groupId },
      });

      return groupMembers.map((member) => member.userid);
    } catch (error) {
      console.error('Error getting group members:', error);
      throw new ConflictException(
        'Failed to get group members. Please try again.',
      );
    }
  }

  async fetchGroupMembers(groupId: string): Promise<string[]> {
    try {
      const members = await this.groupMemberRepository.find({
        where: { groupid: groupId },
      });
      let groupMemberDetails: any[] = [];
      await Promise.all(
        members.map(async (member) => {
          groupMemberDetails.push(await this.getUserDetails(member.userid));
        }),
      );

      return groupMemberDetails;
    } catch (error) {
      throw new ConflictException(
        'Failed to fetch group members. Please try again.',
      );
    }
  }

  async getUserDetails(userId: string): Promise<any> {
    try {
      const result = await this.authClient
        .send({ cmd: 'find-user-by-id' }, userId)
        .toPromise();
      return result;
    } catch (error) {
      throw new ConflictException(
        'Failed to get user details. Please try again.',
      );
    }
  }
}
