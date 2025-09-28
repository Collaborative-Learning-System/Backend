import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGatewayController } from './auth/authGateway.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { WsJwtAuthGuard } from './ws-jwt-auth.guard';
import { NotificationGatewayController } from './notification/notificationGateway.controller';
import { WorkspaceGatewayController } from './workspace/workspaceGateway.controller';
import { QuizGatewayController } from './quiz/quizGateway.controller';
import { EduAssistantGatewayController } from './edu-assistant/eduAssistantGateway.controller';
import { ChatGateway } from './chat/chat.gateway';
import { ChatController } from './chat/chat.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: '1234567890',
      signOptions: { expiresIn: '1h' },
    }),
    ClientsModule.register([
      {
        name: 'auth-service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
      {
        name: 'notification-service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002,
        },
      },
      {
        name: 'workspace-group-service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3003,
        },
      },
      {
        name: 'quiz-leaderboard-service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3006,
        },
      },
      {
        name: 'edu-assistant-service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3007,
        },
      }

    ]),
  ],
  controllers: [ApiGatewayController, AuthGatewayController, NotificationGatewayController, WorkspaceGatewayController, QuizGatewayController, EduAssistantGatewayController, ChatController],
  providers: [ApiGatewayService, JwtAuthGuard, WsJwtAuthGuard, ChatGateway],
  exports: [JwtAuthGuard],
})
export class ApiGatewayModule {}
