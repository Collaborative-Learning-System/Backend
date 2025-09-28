import { Controller, Get } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { ActivityDto } from './dtos/activity.dto';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @MessagePattern({ cmd: 'get-workspace-data' })
  getWorkspaceData(userId: string) {
    const result = this.userServiceService.getWorkspaceData(userId);
    return result;
  }

  @MessagePattern({ cmd: 'get-group-data' })
  getGroupData(groupId: string) {
    const result = this.userServiceService.getGroupData(groupId);
    return result;
  }

  // POST : Log Activities
  @MessagePattern({ cmd: 'log-activity' })
  async logActivity(activityDto: ActivityDto) {
    return this.userServiceService.logActivity(activityDto);
  }

  // GET : Get Logs by User ID
  @MessagePattern({ cmd: 'get-logs-by-user' })
  async getLogsByUserId(userId: string) {
    return this.userServiceService.getLogsByUserId(userId);
  }

  @MessagePattern({ cmd: 'get-user-settings' })
  async getUserSettings(userId: string) {
    const result = this.userServiceService.getUserSettings(userId);
    console.log(result);
    return result;
  }

  @MessagePattern({ cmd: 'save-user-settings' })
  async saveUserSettings(userId: string) { 
    const result = this.userServiceService.saveUserSettings(userId);
    return result;
  }

  @MessagePattern({ cmd: 'toggle-activity-tracking' })
  async toggleActivityTracking(data: { userId: string; trackUser: boolean }) {
    return this.userServiceService.toggleActivityTracking(data.userId, data.trackUser);
  }

}
