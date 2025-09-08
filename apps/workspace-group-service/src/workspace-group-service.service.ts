import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceMember } from './entities/workspace_user.entity';
import { 
  CreateWorkspaceDto, 
  JoinWorkspaceDto, 
  WorkspaceResponseDto, 
  UserWorkspacesResponseDto,
  AllWorkspacesResponseDto
} from './dtos/workspace.dto';

@Injectable()
export class WorkspaceGroupServiceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(WorkspaceMember)
    private workspaceMemberRepository: Repository<WorkspaceMember>,
  ) {}



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
}
