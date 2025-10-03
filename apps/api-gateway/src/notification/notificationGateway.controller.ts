import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
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

  @Post('share-document/:documentId')
  async sendShareDocumentEmail(
    @Param('documentId') documentId: string,
    @Body() emailList: any,
    @Res() res: Response,
  ) {
    if (!emailList || emailList.length === 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: 'Email list is required' });
    }
    const result = await lastValueFrom(
      this.notificationClient.send(
        { cmd: 'share-document' },
        { documentId, emailList },
      ),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('send-notifications')
  async sendNotifications(@Body() body: any, @Res() res: Response) {
    const result = await lastValueFrom(
      this.notificationClient.send({ cmd: 'send-notifications' }, body),
    );
    console.log(body);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('get-notifications/:userId')
  async getNotifications(@Param('userId') userId: string, @Res() res: Response) {
    const result = await lastValueFrom(
      this.notificationClient.send({ cmd: 'get-notifications' }, userId),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
