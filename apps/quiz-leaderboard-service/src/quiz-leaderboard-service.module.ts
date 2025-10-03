import { Module } from '@nestjs/common';
import { QuizLeaderboardServiceController } from './quiz-leaderboard-service.controller';
import { QuizLeaderboardServiceService } from './quiz-leaderboard-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { QuestionOption } from './entities/question-option.entity';
import { QuizAttempt } from './entities/quizattempt.entity';
import { AttemptAnswer } from './entities/attemptAnswer.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [
            Quiz,
            Question,
            QuestionOption,
            QuizAttempt,
            AttemptAnswer,
            User
          ],
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          ssl: {
            rejectUnauthorized:
              configService.get<string>('DB_SSL_REJECT_UNAUTHORIZED') ===
              'true',
          },
        };
      },
    }),

    TypeOrmModule.forFeature([
      Quiz,
      Question,
      QuestionOption,
      QuizAttempt,
      AttemptAnswer,
      User
    ]),
  ],
  controllers: [QuizLeaderboardServiceController],
  providers: [QuizLeaderboardServiceService],
})
export class QuizLeaderboardServiceModule {}
