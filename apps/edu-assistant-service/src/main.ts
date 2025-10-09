import { NestFactory } from '@nestjs/core';
import { EduAssistantServiceModule } from './edu-assistant-service.module';
import {MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(process.cwd(), 'apps', 'edu-assistant-service', '.env');
dotenv.config({ path: envPath });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EduAssistantServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3007,
      },
    },
  );
  await app.listen();
}
bootstrap();
