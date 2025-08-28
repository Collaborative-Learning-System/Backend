import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject('auth-service') private readonly authClient: ClientProxy,
  ) {}

  async signup(signupData: any) {
    try {
      const result = await lastValueFrom(
        this.authClient.send({ cmd: 'signup' }, signupData),
      );
      return result;
    } catch (error) {
      return { success: false, message: error.message || 'Signup failed. Please Try Again Later' };
    }
  }

  async login(loginData: any) {
    try {
      const result = await lastValueFrom(
        this.authClient.send({ cmd: 'login' }, loginData),
      );
      return result;
    } catch (error) {
      return { success: false, message: error.message || 'Login failed. Please Try Again Later' };
    }
  }

  async refreshToken(refreshToken: any) {
    try {
      const result = await lastValueFrom(
        this.authClient.send({ cmd: 'refresh-token' }, refreshToken),
      );
      return result;
    } catch (error) {
      return { success: false, message: error.message || 'Token refresh failed. Please Try Again Later' };
    }
  }
}
