import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UseGuards,
  Get,
  Param,
  Inject,
} from '@nestjs/common';
import { request, type Response } from 'express';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthGatewayController {
  constructor(
    @Inject('auth-service') private readonly authClient: ClientProxy,
  ) {}

  @Post('signup')
  async signup(@Body() signupData: any, @Res() res: Response) {
    const result = await lastValueFrom(
      this.authClient.send({ cmd: 'signup' }, signupData),
    );
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Post('login')
  async login(@Body() loginData: any, @Res() res: Response) {
    const result = await lastValueFrom(
      this.authClient.send({ cmd: 'login' }, loginData),
    );
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
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  @Post('logout/:userId')
  async logOut(@Res() res: Response, @Param('userId') userId: string) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    const result = await lastValueFrom(
      this.authClient.send({ cmd: 'logout' }, userId),
    );
    if (result.success) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  @Post('reset-password')
  async resetPassword(@Res() res: Response, @Body() resetData: any) {
    console.log(resetData);
    const { email, newPassword } = resetData;
    if (!email || !newPassword) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Email and new password are required',
      });
    }
    const result = await lastValueFrom(
      this.authClient.send({ cmd: 'reset-password' }, resetData),
    );
    console.log(result);
    if (result.success) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user-data/:userId')
  async getUserData(@Res() res: Response, @Param('userId') userId: string) {
    const result = await lastValueFrom(
      this.authClient.send({ cmd: 'get-user-data' }, userId),
    );
    if (result.success) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  @Post('refresh-token')
  async refreshToken(@Res() res: Response, @Body() refreshToken: string) {
    const result = await lastValueFrom(
      this.authClient.send({ cmd: 'refresh-token' }, refreshToken),
    );
    if (result.success) {
      res.clearCookie('accessToken');
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
      console.log("result at gateway :", result)
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json(result);
    }
  }
}
