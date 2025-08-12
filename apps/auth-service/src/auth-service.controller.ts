import { Body, Controller } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  // POST : Signup
  @MessagePattern({ cmd: 'signup' })
  async signup(signupData: SignupDto) {
    return await this.authServiceService.signup(signupData);
  }

  // POST : Login
  @MessagePattern({ cmd: 'login' })
  async login(loginData: LoginDto) {
    return this.authServiceService.login(loginData);
  }

  // POST : Refresh Token
  @MessagePattern({ cmd: 'refresh-token' })
  async refresh(token: RefreshTokenDto) {
    return this.authServiceService.refresh(token.refreshToken);
  }

  // POST : Logout
}
