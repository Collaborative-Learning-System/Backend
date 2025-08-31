import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NotificationGatewayService {
  constructor(
    @Inject('notification-service')
    private readonly notificationClient: ClientProxy,
  ) {}

  async sendResetPasswordEmail(email: string) {
    try {
      const result = await lastValueFrom(
        this.notificationClient.send({ cmd: 'reset-password' }, { email }),
      );
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to send reset password email',
      };
    }
  }

  async sendWelcomeEmail(email: string, fullName: string) {
    try {
      const result = await lastValueFrom(
        this.notificationClient.send({ cmd: 'welcome-email' }, { email, fullName }),
      );
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to send welcome email',
      };
    }
  }
}
