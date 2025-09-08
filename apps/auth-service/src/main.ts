import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import * as dotenv from 'dotenv';
import * as path from 'path';

// for .env loads
const envPath = path.resolve(process.cwd(), 'apps', 'auth-service', '.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
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
  console.log('AuthService is running on TCP port 3001');
}

bootstrap();
