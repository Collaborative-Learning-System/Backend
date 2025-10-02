import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { EduAssistantServiceController } from './edu-assistant-service.controller';
import { EduAssistantServiceService } from './edu-assistant-service.service';
import { StudyPlan } from './entities/study_plan.entity';
import { StudyTask } from './entities/study-task.entity';
import { GeminiService } from './services/gemini.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.get<number>('HTTP_TIMEOUT') || 60000,
        maxRedirects: 5,
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [StudyPlan, StudyTask],
        synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
        ssl: {
          rejectUnauthorized: configService.get<string>('DB_SSL_REJECT_UNAUTHORIZED') === 'true',
        },
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    TypeOrmModule.forFeature([StudyPlan, StudyTask]),
  ],
  controllers: [EduAssistantServiceController],
  providers: [EduAssistantServiceService, GeminiService],
})
export class EduAssistantServiceModule {}
