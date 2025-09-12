import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMember } from './entities/group_member.entity';
import { Group } from './entities/group.entity';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceMember } from './entities/workspace_user.entity';
import { Logging } from './entities/logging.entity';
import { UserSettings } from './entities/user_settings.entity';

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
          entities: [GroupMember, Group, Workspace, WorkspaceMember, Logging, UserSettings],
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          ssl: {
            rejectUnauthorized:
              configService.get<string>('DB_SSL_REJECT_UNAUTHORIZED') ===
              'true',
          },
        };
      },
    }),

    TypeOrmModule.forFeature([GroupMember, Group, Workspace, WorkspaceMember, Logging, UserSettings]),
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule {}
