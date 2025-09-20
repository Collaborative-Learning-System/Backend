import { NestFactory } from '@nestjs/core';
import { RealtimeDocEditServiceModule } from './realtime-doc-edit-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as path from 'path';

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

  app.enableCors({
    origin: '*',
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3005,
    },
  });
  await app.startAllMicroservices();

  await app.listen(4000);
  console.log(`RealtimeDocEditService running:
   - HTTP/WebSockets on port 4000
   - TCP Microservice on port 3005
  `);
}
bootstrap();
