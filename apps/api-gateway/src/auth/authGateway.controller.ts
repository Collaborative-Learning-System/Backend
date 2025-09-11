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
  Delete,
  Req,
} from '@nestjs/common';
import { request, type Response } from 'express';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export interface RequestWithCookies extends Request {
  cookies: { [key: string]: string };
}

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
    const { userId, newPassword } = resetData;
    if (!userId || !newPassword) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User ID and new password are required',
      });
    }
    const result = await lastValueFrom(
      this.authClient.send({ cmd: 'reset-password' }, resetData),
    );
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
  async refreshToken(@Req() req: RequestWithCookies, @Res() res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Refresh token is missing',
      });
    }
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
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json(result);
    }
  }

  @Post('update-profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Body() updateData: any, @Res() res: Response) {
    const result = await lastValueFrom(
      this.authClient.send({ cmd: 'update-profile' }, updateData),
    );
    if (result.success) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  @Delete('delete-account/:userId')
  @UseGuards(JwtAuthGuard)
  async deleteAccount(@Param('userId') userId: string, @Res() res: Response) {
    const result = await lastValueFrom(
      this.authClient.send({ cmd: 'delete-account' }, userId),
    );
    if (result.success) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }
}
