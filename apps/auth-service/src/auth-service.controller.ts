import { Body, Controller } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { MessagePattern } from '@nestjs/microservices';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { UpdateProfileDto } from './dtos/updateProfileDto.dto';

@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  // POST : Signup
  @MessagePattern({ cmd: 'signup' })
  async signup(signupData: SignupDto) {
    const result = await this.authServiceService.signup(signupData);
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
  async refresh(refreshToken: string) {
    const result = await this.authServiceService.refresh(refreshToken);
    return result;
  }

  // POST: Find User By Email
  @MessagePattern({ cmd: 'find-user-by-email' })
  async findUserByEmail(email: string) {
    const result = await this.authServiceService.findUserByEmail(email);
    return result;
  }

  // POST: Update Profile
  @MessagePattern({ cmd: 'update-profile' })
  async updateProfile(updateData : UpdateProfileDto) {
    const result = await this.authServiceService.updateProfile(
      updateData
    );
    return result;
  }

  // DELETE: Delete User
  @MessagePattern({ cmd: 'delete-account' })
  async deleteUser(userId: string) {
    const result = await this.authServiceService.deleteUser(userId);
    return result;
  }

  // POST: Find User By Id
  @MessagePattern({ cmd: 'find-user-by-id' })
  async findUserById(userId: string) {
    const result = await this.authServiceService.findUserById(userId);
    return result;
  }

  // POST: Update Profile Picture from File
  @MessagePattern({ cmd: 'update-profile-picture-from-file' })
  async updateProfilePictureFromFile(data: { userId: string; imageBase64: string }) {
    const result = await this.authServiceService.updateProfilePictureFromFile(data.userId, data.imageBase64);
    return result;
  }

  // GET: Get Profile Picture
  @MessagePattern({ cmd: 'get-profile-picture' })
  async getProfilePicture(userId: string) {
    const result = await this.authServiceService.getProfilePicture(userId);
    return result;
  }
}
