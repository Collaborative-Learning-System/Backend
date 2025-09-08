import { Controller } from '@nestjs/common';
import { NotificationServiceService } from './notification-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { EmailDto } from './dtos/email.dto';
import { WelcomeEmailDto } from './dtos/welcomeEmail.dto';
import { ActivityDto } from './dtos/activity.dto';

@Controller()
export class NotificationServiceController {
  constructor(
    private readonly notificationServiceService: NotificationServiceService,
  ) {}

  // POST : reset-password
  @MessagePattern({ cmd: 'reset-password' })
  async sendResetPasswordEmail(emailDto: EmailDto) {
    return this.notificationServiceService.sendResetPasswordEmail(emailDto);
  }

  // POST : welcome-email
  @MessagePattern({ cmd: 'welcome-email' })
  async sendWelcomeEmail(welcomeDto: WelcomeEmailDto) {
    return this.notificationServiceService.sendWelcomeEmail(welcomeDto);
  }

  // POST : Log Activities
  @MessagePattern({ cmd: 'log-activity' })
  async logActivity(activityDto: ActivityDto) {
    return this.notificationServiceService.logActivity(activityDto);
  }

  // GET : Get Logs by User ID
  @MessagePattern({ cmd: 'get-logs-by-user' })
  async getLogsByUserId(userId: string) {
    return this.notificationServiceService.getLogsByUserId(userId);
  }
}
