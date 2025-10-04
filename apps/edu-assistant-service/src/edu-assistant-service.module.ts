import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { EduAssistantServiceController } from './edu-assistant-service.controller';
import { EduAssistantServiceService } from './edu-assistant-service.service';
import { StudyPlan } from './entities/study_plan.entity';
import { StudyTask } from './entities/study-task.entity';
import { GeminiService } from './services/gemini.service';
import { DocumentSummarizationService } from './services/document-summarization.service';
import { PdfProcessingService } from './services/pdf-processing.service';
import { SummarizationController } from './controllers/summarization.controller';

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
    MulterModule.register({
      storage: multer.memoryStorage(), // Store files in memory as Buffer
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
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
  controllers: [EduAssistantServiceController, SummarizationController],
  providers: [
    EduAssistantServiceService, 
    GeminiService, 
    DocumentSummarizationService, 
    PdfProcessingService
  ],
})
export class EduAssistantServiceModule {}
