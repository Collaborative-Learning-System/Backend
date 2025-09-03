import { Body, Controller, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('notification')
export class NotificationGatewayController {
  constructor(
    @Inject('notification-service') private readonly notificationClient: ClientProxy ,
  ) {}

  @Post('reset-password')
  async sendResetPasswordEmail(
    @Body() body: { email: string },
    @Res() res: Response,
  ) {
    if (!body.email) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Email and full name are required',
      });
    }
   const result = await lastValueFrom(
     this.notificationClient.send({ cmd: 'reset-password' }, body),
   );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('welcome-email')
  async sendWelcomeEmail(
    @Body() body: { email: string, fullName: string },
    @Res() res: Response,
  ) {
    if (!body.email || !body.fullName) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Email and full name are required',
      });
    }
    const result = await lastValueFrom(
      this.notificationClient.send(
        { cmd: 'welcome-email' },
        body,
      ),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
