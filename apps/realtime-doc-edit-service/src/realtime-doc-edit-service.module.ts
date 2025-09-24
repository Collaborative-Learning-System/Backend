import { Module } from '@nestjs/common';
import { RealtimeDocEditServiceController } from './realtime-doc-edit-service.controller';
import { RealtimeDocEditServiceService } from './realtime-doc-edit-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentModule } from './modules/documents/document.module';
import { Documents } from './modules/documents/entities/documents.entity';
import { DocumentSnapshots } from './modules/documents/entities/document-snapshots.entity';
import { Collaborators } from './modules/documents/entities/collaborators.entity';
import { User } from './modules/documents/entities/user.entity';

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
          entities: [Documents, Collaborators, User, DocumentSnapshots],
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          ssl: {
            rejectUnauthorized:
              configService.get<string>('DB_SSL_REJECT_UNAUTHORIZED') ===
              'true',
          },
        };
      },
    }),

    TypeOrmModule.forFeature([
      Documents,
      Collaborators,
      User,
      DocumentSnapshots,
    ]),
    DocumentModule,
  ],
  controllers: [RealtimeDocEditServiceController],
  providers: [RealtimeDocEditServiceService],
})
export class RealtimeDocEditServiceModule {}
