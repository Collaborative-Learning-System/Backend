import { Controller, Get } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern } from '@nestjs/microservices';

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
}
