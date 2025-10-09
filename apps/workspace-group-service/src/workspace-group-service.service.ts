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
import { Resource } from './entities/resource.entity';
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
} from './dtos/workspace.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

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
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    @Inject('auth-service') 
    private readonly authClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {
    this.supabaseBucket = this.configService.get<string>('SUPABASE_BUCKET') ?? 'S5P';
  }

  private supabaseInstance: SupabaseClient | null = null;

  private getSupabaseClient(): SupabaseClient {
    if (!this.supabaseInstance) {
      const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
      const supabaseKey = this.configService.get<string>('SUPABASE_KEY');
      console.log('Initializing Supabase client', { supabaseUrl, hasKey: Boolean(supabaseKey) }); 
      if (!supabaseUrl || !supabaseKey) {
        console.warn(
          'Supabase credentials are missing. Resource uploads will fail until SUPABASE_URL and SUPABASE_KEY are configured.',
        );
        throw new ConflictException(
          'Unable to upload file: Supabase credentials are not configured.',
        );
      }

      this.supabaseInstance = createClient(supabaseUrl, supabaseKey);
    }

    return this.supabaseInstance;
  }

  private readonly supabaseBucket: string;

  private determineResourceType(mimeType: string): 'image' | 'video' | 'pdf' {
    if (mimeType.startsWith('image/')) {
      return 'image';
    }

    if (mimeType.startsWith('video/')) {
      return 'video';
    }

    if (mimeType === 'application/pdf') {
      return 'pdf';
    }

    throw new BadRequestException(
      'Unsupported file type. Only images, videos, and PDFs are allowed.',
    );
  }

  private async uploadResourceToSupabase(
    groupId: string,
    fileName: string,
    mimeType: string,
    fileBuffer: Buffer,
  ): Promise<string> {
    const supabase = this.getSupabaseClient();
    const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const storagePath = `${groupId}/${uuidv4()}-${safeFileName}`;

    console.log('[uploadResourceToSupabase] Upload starting', {
      groupId,
      fileName,
      mimeType,
      storagePath,
      bucket: this.supabaseBucket,
    });

    const { error: uploadError } = await supabase.storage
      .from(this.supabaseBucket)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw new ConflictException('Failed to upload file to storage');
    }

    const { data } = supabase.storage
      .from(this.supabaseBucket)
      .getPublicUrl(storagePath);

    if (!data?.publicUrl) {
      throw new ConflictException(
        'Failed to obtain public URL for uploaded file',
      );
    }

    console.log('[uploadResourceToSupabase] Upload successful', {
      storagePath,
      publicUrl: data.publicUrl,
    });

    return data.publicUrl;
  }

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
    console.log(assignAdminDto)
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
    const { groupId, text, attachment } = sendChatMessageDto;

    console.log('[sendChatMessage] Received request', {
      userId,
      groupId,
      hasText: Boolean(text?.trim()),
      hasAttachment: Boolean(attachment),
    });

    if (!text?.trim() && !attachment) {
      throw new BadRequestException(
        'Message must include text or an attachmengggt.',
      );
    }

    try {
      const group = await this.groupRepository.findOne({
        where: { groupid: groupId },
      });

      if (!group) {
        throw new NotFoundException(`Group with ID ${groupId} not found`);
      }

      console.log('[sendChatMessage] Group validated', { groupId });

      // Verify that the user is a member of the group
      const groupMember = await this.groupMemberRepository.findOne({
        where: { groupid: groupId, userid: userId },
      });

      if (!groupMember) {
        throw new ForbiddenException(
          'You must be a member of the group to send messages',
        );
      }

      console.log('[sendChatMessage] User membership confirmed', { userId, groupId });

      let savedResource: Resource | null = null;
      if (attachment) {
        console.log('[sendChatMessage] Processing attachment', {
          fileName: attachment.fileName,
          mimeType: attachment.mimeType,
          title: attachment.title,
        });
        const resourceType = this.determineResourceType(attachment.mimeType);
        console.log('[sendChatMessage] Determined resource type', {
          mimeType: attachment.mimeType,
          resourceType,
        });

        let fileBuffer: Buffer;
        try {
          fileBuffer = Buffer.from(attachment.base64Data, 'base64');
        } catch (conversionError) {
          console.error('Invalid base64 data provided for attachment', conversionError);
          throw new BadRequestException('Attachment data is not valid base64');
        }

        if (!fileBuffer || fileBuffer.length === 0) {
          throw new BadRequestException('Attachment data is empty');
        }

        console.log('[sendChatMessage] Attachment decoded', {
          fileName: attachment.fileName,
          sizeBytes: fileBuffer.length,
        });

        const publicUrl = await this.uploadResourceToSupabase(
          groupId,
          attachment.fileName,
          attachment.mimeType,
          fileBuffer,
        );

        console.log('[sendChatMessage] Upload completed', {
          fileName: attachment.fileName,
          publicUrl,
        });

        const resourceEntity = this.resourceRepository.create({
          userid: userId,
          groupid: groupId,
          title: attachment.title?.trim() || attachment.fileName,
          type: resourceType,
          storageurl: publicUrl,
          description: attachment.description?.trim() || undefined,
        });

        savedResource = await this.resourceRepository.save(resourceEntity);

        console.log('[sendChatMessage] Resource persisted', {
          resourceId: savedResource.resourceid,
          groupId,
          userId,
        });
      }

      const messageType: 'text' | 'resource' = savedResource ? 'resource' : 'text';

      // Create and save the chat message
      const chatMessage = this.chatMessageRepository.create({
        groupid: groupId,
        userid: userId,
        text: text?.trim() || undefined,
        resourceid: savedResource?.resourceid,
        messagetype: messageType,
        sentat: new Date()
      });

      const savedMessage = await this.chatMessageRepository.save(chatMessage);
      console.log('[sendChatMessage] Chat message saved', {
        chatId: savedMessage.chatid,
        groupId,
        userId,
        messageType,
      });

      if (savedResource) {
        savedMessage.resource = savedResource;
      }

      // Fetch sender's username (fullName)
      let senderName = '';
      try {
        const userDetails = await this.getUserDetails(savedMessage.userid);
        senderName = userDetails?.fullName || '';
      } catch (e) {
        senderName = '';
      }

      console.log('[sendChatMessage] Preparing response payload', {
        chatId: savedMessage.chatid,
        hasResource: Boolean(savedResource),
        messageType,
      });

      return {
        chatId: savedMessage.chatid,
        groupId: savedMessage.groupid,
        userId: savedMessage.userid,
        userName: senderName,
        text: savedMessage.text || undefined,
        messageType,
        resource: savedResource
          ? {
              resourceId: savedResource.resourceid,
              title: savedResource.title,
              type: savedResource.type as 'image' | 'video' | 'pdf',
              storageUrl: savedResource.storageurl,
              description: savedResource.description || undefined,
              uploadedAt: savedResource.uploadat,
            }
          : undefined,
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
      const [messages, totalCount] = await this.chatMessageRepository.findAndCount({
        where: { groupid: groupId },
        order: { sentat: 'DESC' },
        take: limit,
        skip: offset,
        relations: ['resource'],
      });

      // Fetch all unique userIds in the messages
      const userIds = Array.from(new Set(messages.map(m => m.userid)));
      const userIdToName: Record<string, string> = {};
      await Promise.all(userIds.map(async (uid) => {
        try {
          const userDetails = await this.getUserDetails(uid);
          userIdToName[uid] = userDetails?.fullName || '';
        } catch (e) {
          userIdToName[uid] = '';
        }
      }));

      const chatMessages: ChatMessageResponseDto[] = messages.map((message) => ({
        chatId: message.chatid,
        groupId: message.groupid,
        userId: message.userid,
        userName: userIdToName[message.userid] || '',
        text: message.text || undefined,
        messageType: message.messagetype,
        resource: message.resource
          ? {
              resourceId: message.resource.resourceid,
              title: message.resource.title,
              type: message.resource.type as 'image' | 'video' | 'pdf',
              storageUrl: message.resource.storageurl,
              description: message.resource.description || undefined,
              uploadedAt: message.resource.uploadat,
            }
          : undefined,
        sentAt: message.sentat,
      }));

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

  /**
   * Delete a group if the user is admin of the workspace
   * @param workspaceId string
   * @param groupId string
   * @param userId string
   */
  async deleteGroup(workspaceId: string, groupId: string, userId: string): Promise<{ message: string }> {
    console.log('[deleteGroup] workspaceId:', workspaceId, 'groupId:', groupId, 'userId:', userId);
    // Validate input
    if (!workspaceId || !groupId || !userId) {
      console.error('[deleteGroup] Missing required parameters');
      throw new BadRequestException('workspaceId, groupId, and userId are required');
    }

    // Check if group exists
    const group = await this.groupRepository.findOne({ where: { groupid: groupId, workspaceid: workspaceId } });
    if (!group) {
      console.error('[deleteGroup] Group not found');
      throw new NotFoundException('Group not found');
    }

    // Check if user is a member of the workspace
    const membership = await this.workspaceMemberRepository.findOne({ where: { workspaceid: workspaceId, userid: userId } });
    if (!membership) {
      console.error('[deleteGroup] User is not a member of the workspace');
      throw new ForbiddenException('You are not a member of this workspace');
    }

    // Only admin can delete group
    if (membership.role !== 'admin') {
      console.error('[deleteGroup] User is not admin');
      throw new ForbiddenException('Only workspace admins can delete groups');
    }

    try {
      // Delete all group members
      await this.groupMemberRepository.delete({ groupid: groupId });
      // Delete all chat messages in the group
      await this.chatMessageRepository.delete({ groupid: groupId });
      // Delete the group itself
      await this.groupRepository.delete({ groupid: groupId });
      console.log('[deleteGroup] Group deleted successfully');
      return { message: 'Group deleted successfully' };
    } catch (error) {
      console.error('[deleteGroup] Error deleting group:', error?.message || error);
      // Propagate the real error message if available
      throw new ConflictException(error?.message || 'Failed to delete group. Please try again.');
    }
  }
}
