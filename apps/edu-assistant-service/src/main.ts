import { NestFactory } from '@nestjs/core';
import { EduAssistantServiceModule } from './edu-assistant-service.module';

async function bootstrap() {
  const app = await NestFactory.create(EduAssistantServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
