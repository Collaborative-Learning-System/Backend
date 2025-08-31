import { Body, Controller, Post, Res, HttpStatus, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGatewayService } from './authGateway.service';
import type { Response } from 'express';
import { JwtAuthGuard } from '../jwt-auth.guard';

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
      const accessToken = result.data.tokens.accessToken;
      const refreshToken = result.data.tokens.refreshToken;
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      return res.status(HttpStatus.OK).json(result)
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

 // @UseGuards(JwtAuthGuard)
  @Post('logout/:userId')
  async logOut(@Res() res: Response, @Param('userId') userId: string) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    const result = await this.authGatewayService.logout(userId);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('reset-password')
  async resetPassword(@Res() res: Response, @Body() resetData: any) {
    const { email, newPassword } = resetData;
    if (!email || !newPassword) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Email and new password are required',
      });
    }
    const result = await this.authGatewayService.resetPassword(
      email,
      newPassword,
    );
    if(result.success) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user-data/:userId')
  async getUserData(@Res() res: Response, @Param('userId') userId: string) {
    const result = await this.authGatewayService.getUserData(userId);
    if (result.success) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }
}
