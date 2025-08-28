import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthGatewayService } from './authGateway.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('signup')
  async signup(@Body() signupData: any, @Res() res: Response) {
    const result = await this.authGatewayService.signup(signupData);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Post('login')
  async login(@Body() loginData: any, @Res() res: Response) {
    const result = await this.authGatewayService.login(loginData);
    if (result.success) {
      const { accessToken, refreshToken } = result.data;
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
      return res.status(HttpStatus.OK).json(result)
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }
}
