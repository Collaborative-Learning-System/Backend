import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { type Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('user')
export class UserGatewayController {
  constructor(
    @Inject('user-service') private readonly userClient: ClientProxy,
  ) {}

  @Get('get-workspace-data/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserWorkspaceData(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const result = await lastValueFrom(
      this.userClient.send({ cmd: 'get-workspace-data' }, userId),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: result.message || 'Failed to fetch workspace data',
      });
    }
    return res.status(HttpStatus.OK).json({
      result,
    });
  }

  @Get('get-group-data/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserGroupData(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const result = await lastValueFrom(
      this.userClient.send({ cmd: 'get-group-data' }, userId),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: result.message || 'Failed to fetch group data',
      });
    }
    return res.status(HttpStatus.OK).json({
      result,
    });
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
      this.userClient.send({ cmd: 'log-activity' }, body),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('get-logs-by-user/:userId')
  @UseGuards(JwtAuthGuard)
  async getLogsByUserId(@Param('userId') userId: string, @Res() res: Response) {
    const result = await lastValueFrom(
      this.userClient.send({ cmd: 'get-logs-by-user' }, userId),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('get-user-settings/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserSettings(@Param('userId') userId: string, @Res() res: Response) {
    console.log('userId', userId);
    const result = await lastValueFrom(
      this.userClient.send({ cmd: 'get-user-settings' }, userId),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('toggle-activity-tracking/:userId')
  @UseGuards(JwtAuthGuard)
  async toggleActivityTracking(
    @Param('userId') userId: string,
    @Res() res: Response,
    @Body() body: { trackUser: boolean },
  ) {
    console.log(body.trackUser);
    const result = await lastValueFrom(
      this.userClient.send(
        { cmd: 'toggle-activity-tracking' },
        { userId, trackUser: body.trackUser },
      ),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }
  @Get('get-suggested-workspaces/:userId')
  async getSuggestedWorkspaces(@Param('userId') userId: string, @Res() res: Response) {
    const result = await lastValueFrom(
      this.userClient.send({ cmd: 'get-suggested-workspaces' }, userId),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    } 
    return res.status(HttpStatus.OK).json(result);
  }
}