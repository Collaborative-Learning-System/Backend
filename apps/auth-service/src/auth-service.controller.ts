import { Body, Controller } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { MessagePattern } from '@nestjs/microservices';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { TokensDto } from './dtos/tokens.dto';

@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  // POST : Signup
  @MessagePattern({ cmd: 'signup' })
  async signup(signupData: SignupDto) {
    const result = await this.authServiceService.signup(signupData);
    console.log('result at auth service controller:', result);
    return result;
  }

  // POST : Login
  @MessagePattern({ cmd: 'login' })
  async login(loginData: LoginDto) {
    const result = await this.authServiceService.login(loginData);
    return result;
  }

  // POST : Logout
  @MessagePattern({ cmd: 'logout' })
  async logOut(userId: string) {
    const result = await this.authServiceService.logout(userId);
    return result;
  }

  // POST : Reset Password
  @MessagePattern({ cmd: 'reset-password' })
  async resetPassword(resetPasswordData: ResetPasswordDto) {
    const result =
      await this.authServiceService.resetPassword(resetPasswordData);
    return result;
  }

  // GET : Get User Data
  @MessagePattern({ cmd: 'get-user-data' })
  async getUserData(userId: string) {
    const result = await this.authServiceService.getUserData(userId);
    return result;
  }

  // POST : Refresh Token
  @MessagePattern({ cmd: 'refresh-token' })
  async refresh(token: { refreshToken: string }) {
    const result = await this.authServiceService.refresh(token.refreshToken);
    console.log("result at controller", result);
    return result;
  }

  // POST: Find User By Email
  @MessagePattern({ cmd: 'find-user-by-email' })
  async findUserByEmail(email: string) {
    const result = await this.authServiceService.findUserByEmail(email);
    return result;
  }
}
