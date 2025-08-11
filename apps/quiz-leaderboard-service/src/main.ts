import { NestFactory } from '@nestjs/core';
import { QuizLeaderboardServiceModule } from './quiz-leaderboard-service.module';

async function bootstrap() {
  const app = await NestFactory.create(QuizLeaderboardServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
