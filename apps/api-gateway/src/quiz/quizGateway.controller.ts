import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  CreateQuizDto,
  GetQuizDto,
  
} from './dtos/quiz-gateway.dto';

@Controller('quiz')
@UseGuards(JwtAuthGuard)
export class QuizGatewayController {
  constructor(
    @Inject('quiz-leaderboard-service') private readonly quizClient: ClientProxy,
  ) {}

  @Post()
  async createQuiz(
    @Body() createQuizDto: CreateQuizDto,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.sub || req.user.userId || req.user.id;
      
      const quizData = {
        ...createQuizDto,
      };

      const result = await lastValueFrom(
        this.quizClient.send({ cmd: 'create_quiz' }, quizData),
      );

      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error creating quiz: ' + error.message,
        data: null,
      });
    }
  }

  @Get(':quizId')
  async getQuiz(@Param('quizId') quizId: string, @Res() res: Response) {
    try {
      const result = await lastValueFrom(
        this.quizClient.send({ cmd: 'get_quiz' }, { quizId }),
      );

      if (!result.success) {
        return res.status(HttpStatus.NOT_FOUND).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error retrieving quiz: ' + error.message,
        data: null,
      });
    }
  }

  @Get('group/:groupId')
  async getQuizzesByGroup(
    @Param('groupId') groupId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await lastValueFrom(
        this.quizClient.send({ cmd: 'get_quizzes_by_group' }, { groupId }),
      );

      if (!result.success) {
        return res.status(HttpStatus.NOT_FOUND).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error retrieving quizzes: ' + error.message,
        data: null,
      });
    }
  }


}
