import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject('auth-service') private readonly authClient: ClientProxy,
  ) {}

  async signup(signupData: any) {
    return await lastValueFrom(
      this.authClient.send({ cmd: 'signup' }, signupData),
    );
  }

  async login(loginData: any) {
    return await lastValueFrom(
      this.authClient.send({ cmd: 'login' }, loginData),
    );
  }
}
