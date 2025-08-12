import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGatewayController } from './auth/authGateway.controller';
import { UserController } from './user/user.controller';
import { AuthGatewayService } from './auth/authGateway.service';
import { NotoficationModule } from './notofication/notoficationGateway.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'auth-service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
    NotoficationModule,
  ],
  controllers: [ApiGatewayController, AuthGatewayController, UserController],
  providers: [ApiGatewayService, AuthGatewayService],
})
export class ApiGatewayModule {}
