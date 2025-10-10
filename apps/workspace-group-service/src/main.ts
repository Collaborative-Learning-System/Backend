import { NestFactory } from '@nestjs/core';
import { WorkspaceGroupServiceModule } from './workspace-group-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as path from 'path';

// for .env loads
const envPath = path.resolve(process.cwd(), 'apps', 'auth-service', '.env');
dotenv.config({ path: envPath });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkspaceGroupServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3003,
      },
    },
  );
  await app.listen();
  console.log('Workspace Group Service is running on port 3003');
}
bootstrap();
