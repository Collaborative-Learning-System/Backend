import { NestFactory } from '@nestjs/core';
import { RealtimeDocEditServiceModule } from './realtime-doc-edit-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as path from 'path';
import cookieParser from 'cookie-parser';

// for .env loads
const envPath = path.resolve(
  process.cwd(),
  'apps',
  'realtime-doc-edit-service',
  '.env',
);
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

async function bootstrap() {
  const app = await NestFactory.create(RealtimeDocEditServiceModule);

  // Enable cookie parsing
  app.use(cookieParser());

   app.enableCors({
     origin: [
       'http://localhost:5173',
       'http://localhost:3000',
       'http://127.0.0.1:5500',
       'http://localhost:8080',
       'https://educollab-snowy.vercel.app',
     ],
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization'],
   });

  await app.startAllMicroservices();

  await app.listen(4000);
  console.log(`RealtimeDocEditService running:
   - HTTP/WebSockets on port 4000
   - TCP Microservice on port 3005
  `);
}
bootstrap();
