import { Module } from '@nestjs/common';
import { NotificationServiceController } from './notification-service.controller';
import { NotificationServiceService } from './notification-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';

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
          entities: [Notification],
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
    TypeOrmModule.forFeature([Notification]),
    ClientsModule.register([
      {
        name: 'auth-service',
        transport: Transport.TCP,
        options: {
          host: 'auth-service',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [NotificationServiceController],
  providers: [NotificationServiceService],
})
export class NotificationServiceModule {}
