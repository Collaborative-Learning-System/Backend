import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pg-3846fd49-gamithchanuka123-04a9.g.aivencloud.com',
      port: 23268,
      username: 'avnadmin',
      // password: 'AVNS_iMkg6XKH9g3NcJ3CDzG',
      password: 'AVNS_iMkg6XKH9g3NcJ3CDzG',
      database: 'defaultdb',
      entities: [User, RefreshToken],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([User, RefreshToken]),
    JwtModule.register({
      global: true,
      secret: '1234567890',
    }),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}
