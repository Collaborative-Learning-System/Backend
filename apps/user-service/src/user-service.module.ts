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
import { ClientsModule, Transport } from '@nestjs/microservices';

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
          entities: [
            GroupMember,
            Group,
            Workspace,
            WorkspaceMember,
            Logging,
            UserSettings,
          ],
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
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

    TypeOrmModule.forFeature([
      GroupMember,
      Group,
      Workspace,
      WorkspaceMember,
      Logging,
      UserSettings,
    ]),
    ClientsModule.register([
      {
        name: 'edu-assistant-service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3007,
        },
      },
    ]),
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule {}
