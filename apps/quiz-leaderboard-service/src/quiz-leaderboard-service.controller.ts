import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { QuizLeaderboardServiceService } from './quiz-leaderboard-service.service';
import { CreateQuizDto } from './dtos/quiz.dto';
import { CompleteQuizDto } from './dtos/complete-quiz.dto';
import { CreateQuizAttemptDto } from './dtos/quiz-attempt.dto';
import { CreateAttemptAnswerDto } from './dtos/attempt-answer.dto';

@Controller()
export class QuizLeaderboardServiceController {
  constructor(
    private readonly quizLeaderboardServiceService: QuizLeaderboardServiceService,
  ) {}

  @MessagePattern('create_quiz')
  async createQuiz(createQuizDto: CreateQuizDto) {
    try {
      console.log('Quiz service received data:', createQuizDto);
      const quiz =
        await this.quizLeaderboardServiceService.createQuiz(createQuizDto);
      console.log('Quiz service created quiz:', quiz);
      return {
        success: true,
        data: quiz,
        message: 'Quiz created successfully',
      };
    } catch (error) {
      console.error('Quiz service error:', error);
      return {
        success: false,
        data: null,
        message: 'Error creating quiz: ' + (error?.message || error),
      };
    }
  }

  @MessagePattern('complete_quiz_with_questions')
  async completeQuizWithQuestions(completeQuizDto: CompleteQuizDto) {
    try {
      console.log('Quiz service received complete quiz data:', completeQuizDto);
      const quiz =
        await this.quizLeaderboardServiceService.completeQuizWithQuestions(
          completeQuizDto,
        );
      console.log('Quiz service completed quiz with questions:', quiz);
      return {
        success: true,
        data: quiz,
        message: 'Quiz completed successfully with questions and options',
      };
    } catch (error) {
      console.error('Quiz service complete error:', error);
      return {
        success: false,
        data: null,
        message: 'Error completing quiz: ' + (error?.message || error),
      };
    }
  }

  @MessagePattern('create_complete_quiz')
  async createCompleteQuiz(createQuizDto: CreateQuizDto) {
    try {
      console.log(
        'Quiz service received complete quiz creation data:',
        createQuizDto,
      );
      const quiz =
        await this.quizLeaderboardServiceService.createCompleteQuiz(
          createQuizDto,
        );
      console.log('Quiz service created complete quiz:', quiz);
      return {
        success: true,
        data: quiz,
        message: 'Complete quiz created successfully',
      };
    } catch (error) {
      console.error('Quiz service complete creation error:', error);
      return {
        success: false,
        data: null,
        message: 'Error creating complete quiz: ' + (error?.message || error),
      };
    }
  }

  @MessagePattern('get_quizzes_by_group')
  async getQuizzesByGroup(data: { groupId: string }) {
    try {
      console.log('Quiz service received get quizzes by group request:', data);
      const quizzes = await this.quizLeaderboardServiceService.getQuizByGroupId(
        data.groupId,
      );
      console.log('Quiz service found quizzes:', quizzes);
      return {
        success: true,
        data: quizzes,
        message: `Found ${quizzes.length} quizzes for group`,
      };
    } catch (error) {
      console.error('Quiz service get by group error:', error);
      return {
        success: false,
        data: null,
        message: 'Error fetching quizzes: ' + (error?.message || error),
      };
    }
  }

  @MessagePattern('get_quiz_by_id')
  async getQuizById(data: { quizId: string }) {
    try {
      console.log('Quiz service getting quiz by ID:', data.quizId);
      const quiz = await this.quizLeaderboardServiceService.getQuizById(
        data.quizId,
      );
      console.log('Quiz service found quiz:', quiz);
      return {
        success: true,
        data: quiz,
        message: 'Quiz retrieved successfully',
      };
    } catch (error) {
      console.error('Quiz service get by ID error:', error);
      return {
        success: false,
        data: null,
        message: 'Error fetching quiz: ' + (error?.message || error),
      };
    }
  }

  // Quiz Attempt Endpoints

  @MessagePattern('start_quiz_attempt')
  async startQuizAttempt(createQuizAttemptDto: CreateQuizAttemptDto) {
    try {
      console.log('Starting quiz attempt:', createQuizAttemptDto);
      const result =
        await this.quizLeaderboardServiceService.startQuizAttempt(
          createQuizAttemptDto,
        );
      console.log('Quiz attempt started:', result);
      return {
        success: true,
        data: result,
        message: 'Quiz attempt started successfully',
      };
    } catch (error) {
      console.error('Start quiz attempt error:', error);
      return {
        success: false,
        data: null,
        message: 'Error starting quiz attempt: ' + (error?.message || error),
      };
    }
  }

  @MessagePattern('save_user_answer')
  async saveUserAnswer(createAttemptAnswerDto: CreateAttemptAnswerDto) {
    try {
      console.log('Saving user answer:', createAttemptAnswerDto);
      const result = await this.quizLeaderboardServiceService.saveUserAnswer(
        createAttemptAnswerDto,
      );
      console.log('User answer saved:', result);
      return {
        success: true,
        data: result,
        message: 'Answer saved successfully',
      };
    } catch (error) {
      console.error('Save user answer error:', error);
      return {
        success: false,
        data: null,
        message: 'Error saving answer: ' + (error?.message || error),
      };
    }
  }

  @MessagePattern('complete_quiz_attempt')
  async completeQuizAttempt(data: { userId: string; attemptId: string }) {
    try {
      console.log('Completing quiz attempt:', data);
      const result =
        await this.quizLeaderboardServiceService.completeQuizAttempt(
          data.attemptId,
          data.userId,
        );
      console.log('Quiz attempt completed:', result);
      return {
        success: true,
        data: result,
        message: 'Quiz attempt completed successfully',
      };
    } catch (error) {
      console.error('Complete quiz attempt error:', error);
      return {
        success: false,
        data: null,
        message: 'Error completing quiz attempt: ' + (error?.message || error),
      };
    }
  }

  @MessagePattern('get_user_quiz_attempts')
  async getUserQuizAttempts(data: { userId: string; quizId: string }) {
    try {
      console.log('Getting user quiz attempts:', data);
      const result =
        await this.quizLeaderboardServiceService.getUserQuizAttempts(
          data.userId,
          data.quizId,
        );
      console.log('User quiz attempts found:', result);
      return {
        success: true,
        data: result,
        message: 'User quiz attempts retrieved successfully',
      };
    } catch (error) {
      console.error('Get user quiz attempts error:', error);
      return {
        success: false,
        data: null,
        message:
          'Error retrieving user quiz attempts: ' + (error?.message || error),
      };
    }
  }

  @MessagePattern('get_quiz_results_for_leaderboard')
  async getQuizResultsForLeaderboard(data: { groupId: string }) {
    const results =
      await this.quizLeaderboardServiceService.getQuizResultsForLeaderboard(
        data.groupId,
      );
    console.log(results)
    return results;
  }

  @MessagePattern('delete_quiz')
  async deleteQuiz(data: { quizId: string }) {
    try {
      console.log('Deleting quiz with ID:', data.quizId);
      await this.quizLeaderboardServiceService.deleteQuiz(data.quizId);
      console.log('Quiz deleted successfully');
      return {
        success: true,
        data: null,
        message: 'Quiz deleted successfully',
      };
    } catch (error) {
      console.error('Delete quiz error:', error);
      return {
        success: false,
        data: null,
        message: 'Error deleting quiz: ' + (error?.message || error),
      };
    } 
  }
}
