import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupMember } from './entities/group_member.entity';
import { Repository } from 'typeorm';
import { WorkspaceMember } from './entities/workspace_user.entity';
import { Workspace } from './entities/workspace.entity';
import { Logging } from './entities/logging.entity';
import { UserSettings } from './entities/user_settings.entity';

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
    @InjectRepository(Logging)
    private readonly loggingRepository: Repository<Logging>,
    @InjectRepository(UserSettings)
    private readonly userSettingsRepository: Repository<UserSettings>,
  ) {}

  async getWorkspaceData(userId: string) {
    const memberships = await this.workspaceMemberRepository.find({
      where: { userid: userId },
      relations: ['workspace'],
    });
    return {
      success: true,
      message: 'Workspace data fetched successfully',
      data: {
        count: memberships.length,
        workspaces: await Promise.all(
          memberships.map(async (m) => ({
            id: m.workspace.workspaceid,
            name: m.workspace.workspacename,
            description: m.workspace.description,
            memberCount: await this.countMembers(m.workspace.workspaceid),
            role: m.role,
          })),
        ),
      },
    };
  }

  async countMembers(workspaceId: string): Promise<number> {
    return await this.workspaceMemberRepository.count({
      where: { workspaceid: workspaceId },
    });
  }

  async getGroupData(userId: string) {
    const memberships = await this.groupMemberRepository.find({
      where: { userid: userId },
      relations: ['group'],
    });

    return {
      success: true,
      message: 'Group data fetched successfully',
      data: {
        count: memberships.length,
        groups: memberships.map((m) => ({
          id: m.group.groupid,
          name: m.group.groupname,
        })),
      },
    };
  }

  async logActivity(activityDto) {
    const { userId, activity, timestamp } = activityDto;

    if (!userId || !activity || !timestamp) {
      return {
        success: false,
        statusCode: 400,
        message: 'Missing required fields',
      };
    }

    const logEntry = this.loggingRepository.create({
      userId,
      activity,
      timestamp: new Date(timestamp),
    });

    await this.loggingRepository.save(logEntry);
    return {
      success: true,
      statusCode: 201,
      message: 'Activity logged successfully',
    };
  }

  async getLogsByUserId(userId: string) {
    const logs = await this.loggingRepository.find({ where: { userId } });
    return { success: true, statusCode: 201, data: logs };
  }

  async getUserSettings(userId: string) {
    const userSettings = await this.userSettingsRepository.findOne({
      where: { userId },
    });
    return {
      success: true,
      statusCode: 200,
      data: {
        trackUser: userSettings?.trackMe,
        sendEmailNotifications: userSettings?.sendEmails,
      },
    };
  }

  async saveUserSettings(userId: string) {
    const user = await this.userSettingsRepository.findOne({ where: { userId } });
    if (user) {
      return { success: true, statusCode: 200, message: 'User settings already exist' };
    }
    await this.userSettingsRepository.save({
      userId:userId,
      trackMe: true,
      sendEmails: true,
    });
    return {
      success: true,
      statusCode: 200,
    };
  }

  async toggleActivityTracking(userId: string, trackUser: boolean) {
    const userSettings = await this.userSettingsRepository.findOne({
      where: { userId },
    });
    if (userSettings) {
      userSettings.trackMe = trackUser;
      await this.userSettingsRepository.save(userSettings);
      return {
        success: true,
        statusCode: 200,
        message: 'User settings changed successfully',
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: 'User settings changed failed',
      };
    }
  }
}
