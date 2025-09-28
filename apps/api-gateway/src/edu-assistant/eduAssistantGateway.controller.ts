import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('api/study-plans')
export class EduAssistantGatewayController {
  constructor(
    @Inject('edu-assistant-service') private readonly eduAssistantClient: ClientProxy,
  ) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async generateStudyPlan(@Body() generateStudyPlanData: any, @Res() res: Response) {
    try {
      const result = await lastValueFrom(
        this.eduAssistantClient.send({ cmd: 'generate-study-plan' }, generateStudyPlanData),
      );
      
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to generate study plan',
        error: error.message,
      });
    }
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getStudyPlansByUserId(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const result = await lastValueFrom(
        this.eduAssistantClient.send({ cmd: 'get-study-plans-by-user' }, { userId }),
      );
      
      if (!result.success) {
        return res.status(HttpStatus.NOT_FOUND).json(result);
      }
      
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to retrieve study plans',
        error: error.message,
      });
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getStudyPlan(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const result = await lastValueFrom(
        this.eduAssistantClient.send({ cmd: 'get-study-plan' }, { id }),
      );
      
      if (!result.success) {
        return res.status(HttpStatus.NOT_FOUND).json(result);
      }
      
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to retrieve study plan',
        error: error.message,
      });
    }
  }

  @Get()
  getHello(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Edu Assistant Service Gateway is running!',
    });
  }
}