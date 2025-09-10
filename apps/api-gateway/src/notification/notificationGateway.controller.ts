import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('notification')
export class NotificationGatewayController {
  constructor(
    @Inject('notification-service')
    private readonly notificationClient: ClientProxy,
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
    @Body() body: { email: string; fullName: string },
    @Res() res: Response,
  ) {
    if (!body.email || !body.fullName) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Email and full name are required',
      });
    }
    const result = await lastValueFrom(
      this.notificationClient.send({ cmd: 'welcome-email' }, body),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('log-activity')
  async logActivity(
    @Body() body: { userId: string; activity: string; timestamp: string },
    @Res() res: Response,
  ) {
    if (!body.userId || !body.activity || !body.timestamp) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User ID, activity, and timestamp are required',
      });
    }
    const result = await lastValueFrom(
      this.notificationClient.send({ cmd: 'log-activity' }, body),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('get-logs-by-user/:userId')
  async getLogsByUserId(@Param('userId') userId: string, @Res() res: Response) {
    const result = await lastValueFrom(
      this.notificationClient.send({ cmd: 'get-logs-by-user' }, userId),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}