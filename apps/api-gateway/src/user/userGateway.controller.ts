import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { type Response } from 'express';

@Controller('user')
export class UserGatewayController {
  constructor(
    @Inject('user-service') private readonly userClient: ClientProxy,
  ) {}

  @Get('get-workspace-data/:userId')
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
}
