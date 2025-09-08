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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const usePostgres = configService.get<string>('USE_POSTGRES') === 'true';
        
        if (usePostgres) {
          // PostgreSQL configuration
          const config: any = {
            type: 'postgres',
            host: configService.get<string>('DB_HOST') || 'localhost',
            port: configService.get<number>('DB_PORT') || 5432,
            username: configService.get<string>('DB_USERNAME') || 'postgres',
            password: configService.get<string>('DB_PASSWORD') || 'password',
            database: configService.get<string>('DB_DATABASE') || 'collaborative_learning',
            entities: [Workspace, WorkspaceMember, Group, GroupMember, ChatMessage],
            synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true' || false,
          };

          // Only add SSL configuration if enabled
          if (configService.get<string>('DB_SSL_ENABLED') === 'true') {
            config.ssl = {
              rejectUnauthorized: configService.get<string>('DB_SSL_REJECT_UNAUTHORIZED') === 'true',
            };
          }

          return config;
        } 
      },
    }),
    TypeOrmModule.forFeature([Workspace, WorkspaceMember, Group, GroupMember, ChatMessage]),
  ],
  controllers: [WorkspaceGroupServiceController],
  providers: [WorkspaceGroupServiceService],
})
export class WorkspaceGroupServiceModule {}
