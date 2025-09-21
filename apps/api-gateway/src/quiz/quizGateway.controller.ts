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
  CompleteQuizDto,
  CreateCompleteQuizDto,
  GetQuizzesByGroupDto,
  StartQuizAttemptDto,
  SaveUserAnswerDto,
  CompleteQuizAttemptDto,
  GetQuizAttemptDto,
  GetUserQuizAttemptsDto,
  GetQuizLeaderboardDto,
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
      console.log('Received quiz data:', createQuizDto);

      const quizData = {
        ...createQuizDto,
      };

      console.log('Sending to quiz service:', quizData);
      
      const result = await lastValueFrom(
        this.quizClient.send('create_quiz', quizData),
      );

      console.log('Response from quiz service:', result);

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      console.error('Quiz creation error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error creating quiz: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }

  @Post('complete')
  async completeQuizWithQuestions(
    @Body() completeQuizDto: CompleteQuizDto,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      console.log('Received complete quiz data:', completeQuizDto);
      
      const result = await lastValueFrom(
        this.quizClient.send('complete_quiz_with_questions', completeQuizDto),
      );

      console.log('Response from quiz service:', result);

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error('Quiz completion error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error completing quiz: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }

  @Post('create-complete')
  async createCompleteQuiz(
    @Body() createCompleteQuizDto: CreateCompleteQuizDto,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      console.log('Received complete quiz creation data:', createCompleteQuizDto);
      
      const result = await lastValueFrom(
        this.quizClient.send('create_complete_quiz', createCompleteQuizDto),
      );

      console.log('Response from quiz service:', result);

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      console.error('Complete quiz creation error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error creating complete quiz: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }

  @Get('group/:groupId')
  async getQuizzesByGroup(
    @Param('groupId') groupId: string,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      console.log('Received get quizzes by group request for groupId:', groupId);
      
      const result = await lastValueFrom(
        this.quizClient.send('get_quizzes_by_group', { groupId }),
      );

      console.log('Response from quiz service:', result);

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error('Get quizzes by group error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error fetching quizzes: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }

  @Get(':quizId')
  async getQuizById(
    @Param('quizId') quizId: string,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      console.log('Getting quiz by ID:', quizId);
      
      const result = await lastValueFrom(
        this.quizClient.send('get_quiz_by_id', { quizId }),
      );

      console.log('Response from quiz service:', result);

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error('Get quiz by ID error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error fetching quiz: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }

  

  @Post('attempt/start')
  async startQuizAttempt(
    @Body() startQuizAttemptDto: StartQuizAttemptDto,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      console.log('Starting quiz attempt:', startQuizAttemptDto);
      
      const result = await lastValueFrom(
        this.quizClient.send('start_quiz_attempt', startQuizAttemptDto),
      );

      console.log('Response from quiz service:', result);

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      console.error('Start quiz attempt error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error starting quiz attempt: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }

  @Post('attempt/save-answer')
  async saveUserAnswer(
    @Body() saveUserAnswerDto: SaveUserAnswerDto,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      console.log('Saving user answer:', saveUserAnswerDto);
      
      const result = await lastValueFrom(
        this.quizClient.send('save_user_answer', saveUserAnswerDto),
      );

      console.log('Response from quiz service:', result);

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error('Save user answer error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error saving answer: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }

  @Put('attempt/complete')
  async completeQuizAttempt(
    @Body() completeQuizAttemptDto: CompleteQuizAttemptDto,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      console.log('Completing quiz attempt:', completeQuizAttemptDto);
      
      const result = await lastValueFrom(
        this.quizClient.send('complete_quiz_attempt', completeQuizAttemptDto),
      );

      console.log('Response from quiz service:', result);

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error('Complete quiz attempt error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error completing quiz attempt: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }

  @Get('attempts/user/:userId/quiz/:quizId')
  async getUserQuizAttempts(
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      console.log('Getting user quiz attempts for userId:', userId, 'quizId:', quizId);
      
      const getUserQuizAttemptsDto: GetUserQuizAttemptsDto = {
        userId,
        quizId,
      };
      
      const result = await lastValueFrom(
        this.quizClient.send('get_user_quiz_attempts', getUserQuizAttemptsDto),
      );

      console.log('Response from quiz service:', result);

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error('Get user quiz attempts error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error fetching user quiz attempts: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }
}