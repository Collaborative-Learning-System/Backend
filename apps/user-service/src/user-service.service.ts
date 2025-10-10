import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupMember } from './entities/group_member.entity';
import { In, Repository } from 'typeorm';
import { WorkspaceMember } from './entities/workspace_user.entity';
import { Workspace } from './entities/workspace.entity';
import { Logging } from './entities/logging.entity';
import { UserSettings } from './entities/user_settings.entity';
import { ClientProxy } from '@nestjs/microservices';

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
    @Inject('edu-assistant-service')
    private readonly eduAssistantClient: ClientProxy,
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

  async getSuggestedWorkspaces(userId: string) { 
    try {
      // fetch all the workspace Ids that the user is already a member of
      const workspacesIamIn = await this.workspaceMemberRepository.find({
        where: { userid: userId },
      });

      // // fetch all the users in all those workspaces where user is a member
      // const usersInMyWorkspaces = await this.workspaceMemberRepository.find({
      //   where: workspacesIamIn.map(w => ({ workspaceid: w.workspaceid })),
      // })

      // // fetch all the workspace ids of those users that the user is not a member of
      // const suggestedWorkspaceIds = await this.workspaceMemberRepository.find({
      //   where: {
      //     usersInMyWorkspaces
      //     .filter(u => u.userid !== userId) // exclude the user himself
      //       .map(u => ({ userid: u.userid })),
      //     workspacesIamIn
      //       .filter(w => w.workspaceid !== u.workspaceid) // exclude the workspaces that the user is already a member of
      //   }
      // })
      // Get all users who share at least one workspace with the current user
      const usersInMyWorkspaces = await this.workspaceMemberRepository.find({
        where: { workspaceid: In(workspacesIamIn.map((w) => w.workspaceid)) },
      });

      // Exclude the current user
      const otherUserIds = usersInMyWorkspaces
        .map((u) => u.userid)
        .filter((id) => id !== userId);

      // Find all workspaces those users are in
      const allWorkspacesOfOtherUsers =
        await this.workspaceMemberRepository.find({
          where: { userid: In(otherUserIds) },
        });

      // Exclude the workspaces the current user is already in
      const suggestedWorkspaceIds = [
        ...new Set(
          allWorkspacesOfOtherUsers
            .map((w) => w.workspaceid)
            .filter(
              (id) => !workspacesIamIn.some((my) => my.workspaceid === id),
            ),
        ),
      ];

      //  Get workspace details
      const suggestedWorkspaces = await this.workspaceRepository.findByIds(
        suggestedWorkspaceIds,
      );

      // My workspace details
      const myWorkspaces = await this.workspaceRepository.findByIds(
        workspacesIamIn.map((w) => w.workspaceid),
      );

      // Call Gemini API to get personalized suggestions
      const resultFromGemini = await this.eduAssistantClient
        .send(
          {
            cmd: 'get-personalized-workspace-suggestions',
          },
          {
            myWorkspaces,
            suggestedWorkspaces,
          },
        )
        .toPromise();

      if (!resultFromGemini || !resultFromGemini.success) {
        return {
          success: false,
          statusCode: 500,
          message: 'Failed to fetch suggestions from Edu Assistant Service',
          error: resultFromGemini?.message || 'Unknown error',
        };
      }

      // get the count of members in each suggested workspace
      for (const ws of resultFromGemini.data.suggestedWorkspacesForYou) {
        ws.memberCount = await this.countMembers(ws.workspaceId);
      }

      return {
        success: true,
        statusCode: 200,
        data: resultFromGemini.data,
      };
    } catch (error) { 
      return {
        success: false,
        statusCode: 500,
        message: 'Failed to fetch suggested workspaces',
        error: error.message,
      };
    }
  }
}
