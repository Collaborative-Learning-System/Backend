import { Controller, Get } from '@nestjs/common';
import { QuizLeaderboardServiceService } from './quiz-leaderboard-service.service';

@Controller()
export class QuizLeaderboardServiceController {
  constructor(private readonly quizLeaderboardServiceService: QuizLeaderboardServiceService) {}

  @Get()
  getHello(): string {
    return this.quizLeaderboardServiceService.getHello();
  }
}
