import { Test, TestingModule } from '@nestjs/testing';
import { QuizLeaderboardServiceController } from './quiz-leaderboard-service.controller';
import { QuizLeaderboardServiceService } from './quiz-leaderboard-service.service';

describe('QuizLeaderboardServiceController', () => {
  let quizLeaderboardServiceController: QuizLeaderboardServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuizLeaderboardServiceController],
      providers: [QuizLeaderboardServiceService],
    }).compile();

    quizLeaderboardServiceController = app.get<QuizLeaderboardServiceController>(QuizLeaderboardServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(quizLeaderboardServiceController.getHello()).toBe('Hello World!');
    });
  });
});
