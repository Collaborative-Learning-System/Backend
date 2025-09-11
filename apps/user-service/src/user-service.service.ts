import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupMember } from './entities/group_member.entity';
import { Repository } from 'typeorm';
import { WorkspaceMember } from './entities/workspace_user.entity';
import { Workspace } from './entities/workspace.entity';

@Injectable()
export class UserServiceService {
  constructor(
    @InjectRepository(GroupMember)
    private readonly groupMemberRepository: Repository<GroupMember>,
    @InjectRepository(WorkspaceMember)
    private readonly workspaceMemberRepository: Repository<WorkspaceMember>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) { }
  
  async getWorkspaceData(userId: string) {
    const memberships = await this.workspaceMemberRepository.find({
      where: { userid: userId },
      relations: ['workspace']
    })
    return {
      success: true,
      message: 'Workspace data fetched successfully',
      data: { 
        count: memberships.length,
        workspaces: await Promise.all(memberships.map(async(m) => ({
          id: m.workspace.workspaceid,
          name: m.workspace.workspacename,
          description: m.workspace.description,
          memberCount: await this.countMembers(m.workspace.workspaceid),
          role: m.role
        })))
      }
    }
  }

  async countMembers(workspaceId: string): Promise<number> {
    return await this.workspaceMemberRepository.count({
      where: { workspaceid: workspaceId }
    });
  }

  async getGroupData(userId: string) {
    const memberships = await this.groupMemberRepository.find({
      where: { userid: userId },
      relations: ['group']
    })

    return {
      success: true,
      message: 'Group data fetched successfully',
      data: {
        count: memberships.length,
        groups: memberships.map(m => ({
          id: m.group.groupid,
          name: m.group.groupname,
        }))
      }
    }
  }
}
