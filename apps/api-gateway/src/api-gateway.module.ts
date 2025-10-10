import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGatewayController } from './auth/authGateway.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { WsJwtAuthGuard } from './guards/ws-jwt-auth.guard';
import { NotificationGatewayController } from './notification/notificationGateway.controller';
import { WorkspaceGatewayController } from './workspace/workspaceGateway.controller';
import { QuizGatewayController } from './quiz/quizGateway.controller';
import { EduAssistantGatewayController } from './edu-assistant/eduAssistantGateway.controller';
import { ChatGateway } from './chat/chat.gateway';
import { ChatController } from './chat/chat.controller';
import { UserGatewayController } from './user/userGateway.controller';
import { DocEditGatewayController } from './doc-editing/doc-editGateway.controller';

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
          host: 'auth-service',
          port: 3001,
        },
      },
      {
        name: 'notification-service',
        transport: Transport.TCP,
        options: {
          host: 'notification-service',
          port: 3002,
        },
      },
      {
        name: 'workspace-group-service',
        transport: Transport.TCP,
        options: {
          host: 'workspace-group-service',
          port: 3003,
        },
      },
      {
        name: 'user-service',
        transport: Transport.TCP,
        options: {
          host: 'user-service',
          port: 3004,
        },
      },
      {
        name: 'doc-editing-service',
        transport: Transport.TCP,
        options: {
          host: 'realtime-doc-edit-service',
          port: 4000,
        },
      },
      {
        name: 'quiz-leaderboard-service',
        transport: Transport.TCP,
        options: {
          host: 'quiz-leaderboard-service',
          port: 3006,
        },
      },
      {
        name: 'edu-assistant-service',
        transport: Transport.TCP,
        options: {
          host: 'edu-assistant-service',
          port: 3007,
        },
      },
    ]),
  ],
  controllers: [
    ApiGatewayController,
    AuthGatewayController,
    NotificationGatewayController,
    WorkspaceGatewayController,
    QuizGatewayController,
    EduAssistantGatewayController,
    ChatController,
    UserGatewayController,
    DocEditGatewayController,
  ],
  providers: [ApiGatewayService, JwtAuthGuard, WsJwtAuthGuard, ChatGateway],
  exports: [JwtAuthGuard],
})
export class ApiGatewayModule {}
