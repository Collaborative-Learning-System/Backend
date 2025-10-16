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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
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
    @Inject('quiz-leaderboard-service')
    private readonly quizClient: ClientProxy,
  ) {}

  @Post()
  async createQuiz(
    @Body() createQuizDto: CreateQuizDto,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      const quizData = {
        ...createQuizDto,
      };

      const result = await lastValueFrom(
        this.quizClient.send('create_quiz', quizData),
      );
      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
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
      const result = await lastValueFrom(
        this.quizClient.send('complete_quiz_with_questions', completeQuizDto),
      );
      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
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
      const result = await lastValueFrom(
        this.quizClient.send('create_complete_quiz', createCompleteQuizDto),
      );

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
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
      const result = await lastValueFrom(
        this.quizClient.send('get_quizzes_by_group', { groupId }),
      );

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
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
      const result = await lastValueFrom(
        this.quizClient.send('get_quiz_by_id', { quizId }),
      );

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
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
      const result = await lastValueFrom(
        this.quizClient.send('start_quiz_attempt', startQuizAttemptDto),
      );

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
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
      const result = await lastValueFrom(
        this.quizClient.send('save_user_answer', saveUserAnswerDto),
      );
      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
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
    @Res() res: Response,
  ) {
    try {
      const result = await lastValueFrom(
        this.quizClient.send('complete_quiz_attempt', completeQuizAttemptDto),
      );

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: result?.message || 'Failed to complete quiz attempt',
        });
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error completing quiz attempt: ' + (error?.message || error),
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
      const getUserQuizAttemptsDto: GetUserQuizAttemptsDto = {
        userId,
        quizId,
      };

      const result = await lastValueFrom(
        this.quizClient.send('get_user_quiz_attempts', getUserQuizAttemptsDto),
      );

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          'Error fetching user quiz attempts: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }

  @Get('results/:groupId')
  async getQuizResultsForLeaderboard(
    @Param('groupId') groupId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await lastValueFrom(
        this.quizClient.send('get_quiz_results_for_leaderboard', { groupId }),
      );

      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error fetching quiz results: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }


  @Delete('delete/:quizId')
  async deleteQuiz(
    @Param('quizId') quizId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await lastValueFrom(
        this.quizClient.send('delete_quiz', { quizId }),
      );
      if (!result?.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error deleting quiz: ' + (error?.message || error),
        data: null,
        errorDetails: error,
      });
    }
  }
}
