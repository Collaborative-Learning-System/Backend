import { NestFactory } from '@nestjs/core';
import { WorkspaceGroupServiceModule } from './workspace-group-service.module';

async function bootstrap() {
  const app = await NestFactory.create(WorkspaceGroupServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
