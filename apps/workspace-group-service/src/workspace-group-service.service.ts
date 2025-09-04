import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceMember } from './entities/workspace-member.entity';
import { 
  CreateWorkspaceDto, 
  JoinWorkspaceDto, 
  WorkspaceResponseDto, 
  UserWorkspacesResponseDto 
} from './dtos/workspace.dto';

@Injectable()
export class WorkspaceGroupServiceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(WorkspaceMember)
    private workspaceMemberRepository: Repository<WorkspaceMember>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createWorkspace(userId: string, createWorkspaceDto: CreateWorkspaceDto): Promise<WorkspaceResponseDto> {
    try {
      // Create workspace
      const workspace = this.workspaceRepository.create({
        workspacename: createWorkspaceDto.name,
        description: createWorkspaceDto.description,
      });

      const savedWorkspace = await this.workspaceRepository.save(workspace);

      // Add creator as admin member
      const adminMember = this.workspaceMemberRepository.create({
        workspaceid: savedWorkspace.workspaceid,
        userid: userId,
        role: 'admin',
      });

      await this.workspaceMemberRepository.save(adminMember);

      return {
        id: savedWorkspace.workspaceid,
        name: savedWorkspace.workspacename,
        description: savedWorkspace.description,
        adminId: userId, // The creator is the admin
        role: 'admin',
      };
    } catch (error) {
      throw new ConflictException('Failed to create workspace');
    }
  }

  async joinWorkspace(userId: string, joinWorkspaceDto: JoinWorkspaceDto): Promise<WorkspaceResponseDto> {
    const { workspaceId } = joinWorkspaceDto;

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
      throw new ConflictException('User is already a member of this workspace');
    }

    // Add user as member
    const member = this.workspaceMemberRepository.create({
      workspaceid: workspaceId,
      userid: userId,
      role: 'member',
    });

    await this.workspaceMemberRepository.save(member);

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
}
