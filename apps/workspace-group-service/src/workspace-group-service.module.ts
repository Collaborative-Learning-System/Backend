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
            return {
              type: 'postgres',
              host: configService.get<string>('DB_HOST'),
              port: configService.get<number>('DB_PORT'),
              username: configService.get<string>('DB_USERNAME'),
              password: configService.get<string>('DB_PASSWORD'),
              database: configService.get<string>('DB_DATABASE'),
              entities: [Workspace, WorkspaceMember, Group, GroupMember, ChatMessage],
              synchronize:
                configService.get<string>('DB_SYNCHRONIZE') === 'true',
              ssl: {
                rejectUnauthorized:
                  configService.get<string>('DB_SSL_REJECT_UNAUTHORIZED') ===
                  'true',
              },
            };
          },
        }),
    TypeOrmModule.forFeature([Workspace, WorkspaceMember, Group, GroupMember, ChatMessage]),
  ],
  controllers: [WorkspaceGroupServiceController],
  providers: [WorkspaceGroupServiceService],
})
export class WorkspaceGroupServiceModule {}
