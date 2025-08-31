import { Controller } from '@nestjs/common';
import { NotificationServiceService } from './notification-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { EmailDto } from './dtos/email.dto';

@Controller()
export class NotificationServiceController {
  constructor(
    private readonly notificationServiceService: NotificationServiceService,
  ) {}

  // Post : reset-password
  @MessagePattern({ cmd: 'reset-password' })
  async sendResetPasswordEmail(emailDto: EmailDto) {
    return this.notificationServiceService.sendResetPasswordEmail(emailDto);
  }
}
