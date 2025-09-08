import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { QuizLeaderboardServiceService } from './quiz-leaderboard-service.service';
import { CreateQuizDto } from './dtos/quiz.dto';


@Controller()
export class QuizLeaderboardServiceController {
  constructor(private readonly quizLeaderboardServiceService: QuizLeaderboardServiceService) {}

  @MessagePattern('create_quiz')
  async createQuiz(createQuizDto: CreateQuizDto) {
    try{
      const quiz = await this.quizLeaderboardServiceService.createQuiz(createQuizDto);
      return {
        success: true,
        data: quiz,
        message: 'Quiz created successfully'
      };
    } catch (error){
      return{
        success: false,
        data: null,
        message: 'Error creating quiz: ' + error.message
      }
    }
    }
  
 }

