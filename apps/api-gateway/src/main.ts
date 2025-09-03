import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(process.env.port ?? 3000);
  console.log('API gateway is running on port 3000');
}

bootstrap();
