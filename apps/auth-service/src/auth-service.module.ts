import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; // Adjust the import path as necessary
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'PostgreYohan',
      database: 'collaborative_learning_platform',
      entities: [User, RefreshToken],
      synchronize: true,
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
