import { Body, Controller, Post } from '@nestjs/common';
import { AuthGatewayService } from './authGateway.service';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('signup')
  async signup(@Body() signupData: any) {
    return this.authGatewayService.signup(signupData);
  }

  @Post('login')
  async login(@Body() loginData: any) {
    return this.authGatewayService.login(loginData);
  }
}
