import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkspaceGroupServiceController } from './workspace-group-service.controller';
import { WorkspaceGroupServiceService } from './workspace-group-service.service';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceMember } from './entities/workspace_user.entity';
import { Group } from './entities/group.entity';
import { GroupMember } from './entities/group-member.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { Resource } from './entities/resource.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
     TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              type: 'postgres',
              host: configService.get<string>('DB_HOST'),
              port: configService.get<number>('DB_PORT'),
              username: configService.get<string>('DB_USERNAME'),
              password: configService.get<string>('DB_PASSWORD'),
              database: configService.get<string>('DB_DATABASE'),
              entities: [Workspace, WorkspaceMember, Group, GroupMember, ChatMessage, Resource],
              synchronize:
                configService.get<string>('DB_SYNCHRONIZE') === 'true',
              ssl: {
                rejectUnauthorized:
                  configService.get<string>('DB_SSL_REJECT_UNAUTHORIZED') ===
                  'true',
              },
              // Connection pool settings
              poolSize: 5, // Maximum number of connections in the pool
              connectionTimeoutMillis: 2000, // Connection timeout in milliseconds
              idleTimeoutMillis: 30000, // Idle connection timeout
              maxQueryExecutionTime: 1000, // Query execution timeout
            };
          },
        }),
  TypeOrmModule.forFeature([Workspace, WorkspaceMember, Group, GroupMember, ChatMessage, Resource]),
    ClientsModule.register([
      {
        name: 'auth-service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ])
  ],
  controllers: [WorkspaceGroupServiceController],
  providers: [WorkspaceGroupServiceService],
})
export class WorkspaceGroupServiceModule {}
