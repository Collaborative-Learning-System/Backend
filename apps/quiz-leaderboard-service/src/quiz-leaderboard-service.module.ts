import { Module } from '@nestjs/common';
import { QuizLeaderboardServiceController } from './quiz-leaderboard-service.controller';
import { QuizLeaderboardServiceService } from './quiz-leaderboard-service.service';

@Module({
  imports: [],
  controllers: [QuizLeaderboardServiceController],
  providers: [QuizLeaderboardServiceService],
})
export class QuizLeaderboardServiceModule {}
