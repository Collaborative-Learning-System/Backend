import { NestFactory } from '@nestjs/core';
import { RealtimeDocEditServiceModule } from './realtime-doc-edit-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RealtimeDocEditServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
