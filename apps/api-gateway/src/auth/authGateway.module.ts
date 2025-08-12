import { Module } from '@nestjs/common';
import { AuthGatewayService } from './authGateway.service';
import { AuthGatewayController } from './authGateway.controller';

@Module({
  imports: [],
  controllers: [AuthGatewayController],
  providers: [AuthGatewayService],
})
export class AuthGatewayModule {}
