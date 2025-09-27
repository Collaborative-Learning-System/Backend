import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// for .env loads
const envPath = path.resolve(process.cwd(), 'apps', 'auth-service', '.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3004,
      },
    },
  );
  await app.listen();
  console.log("User Service is running on port 3004!");
}
bootstrap();
