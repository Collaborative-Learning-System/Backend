import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthGatewayService } from './authGateway.service';
import type { Response } from 'express';


@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('signup')
  async signup(@Body() signupData: any) {
    return this.authGatewayService.signup(signupData);
  }

  @Post('login')
  async login(@Body() loginData: any, @Res() res : Response) {
    const { accessToken, refreshToken } = await this.authGatewayService.login(loginData);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res.json({ message: 'Login successful' });
  }
}
