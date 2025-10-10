import { NestFactory } from '@nestjs/core';
import { NotificationServiceModule } from './notification-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';

// Load environment variables from notification-service/.env
const envPath = path.resolve(
  process.cwd(),
  'apps',
  'notification-service',
  '.env',
);
dotenv.config({ path: envPath });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3002,
      },
    },
  );
    // for class validator
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
  
    // Apply global validation exception filter
    app.useGlobalFilters(new ValidationExceptionFilter());
  
  await app.listen();
  console.log('Notification service is running on port 3002');
}
bootstrap();
