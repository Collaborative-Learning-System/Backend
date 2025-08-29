// import { Module } from '@nestjs/common';
// import { AuthServiceController } from './auth-service.controller';
// import { AuthServiceService } from './auth-service.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import { JwtModule } from '@nestjs/jwt';
// import { RefreshToken } from './entities/refresh-token.entity';
// import { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'pg-3846fd49-gamithchanuka123-04a9.g.aivencloud.com',
//       port: 23268,
//       username: 'avnadmin',
//       password: 'AVNS_iMkg6XKH9g3NcJ3CDzG',
//       database: 'defaultdb',
//       entities: [User, RefreshToken],
//       synchronize: true,
//       ssl: { rejectUnauthorized: false },
//     }),
//     TypeOrmModule.forFeature([User, RefreshToken]),
//     JwtModule.register({
//       global: true,
//       secret: '1234567890',
//     }),
//   ],
//   controllers: [AuthServiceController],
//   providers: [AuthServiceService],
// })
// export class AuthServiceModule {}
import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
          entities: [User, RefreshToken],
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          ssl: {
            rejectUnauthorized:
              configService.get<string>('DB_SSL_REJECT_UNAUTHORIZED') ===
              'true',
          },
        };
      },
    }),

    TypeOrmModule.forFeature([User, RefreshToken]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}
