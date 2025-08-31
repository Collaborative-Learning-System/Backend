import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { NotificationGatewayService } from './notificationGateway.service';

@Controller('notification')
export class NotificationGatewayController {
  constructor(
    private readonly notificationGatewayService: NotificationGatewayService,
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
    const result = await this.notificationGatewayService.sendResetPasswordEmail(
      body.email,
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
    const result = await this.notificationGatewayService.sendWelcomeEmail(
      body.email,
      body.fullName,
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
