import { NestFactory } from '@nestjs/core';
import { QuizLeaderboardServiceModule } from './quiz-leaderboard-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(process.cwd(), 'apps', 'quiz-leaderboard-service', '.env');
dotenv.config({ path: envPath });


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    QuizLeaderboardServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3006,
      },
    },
  );
  await app.listen();
  console.log('Quiz Leaderboard Service is running on port 3006');
}
bootstrap();
