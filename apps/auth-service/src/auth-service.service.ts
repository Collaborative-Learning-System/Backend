import { Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { stat } from 'fs';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signup(signupData: SignupDto) {
    const { fullName, email, password } = signupData;

    // check whether the email in use
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      return {
        success: false,
        statusCode: 401,
        message: 'Email already in use',
      };
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user entity and save it to the database
    await this.userRepository.save({
      fullName,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    return {
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
    };
  }

  async login(loginData: LoginDto) {
    const { email, password } = loginData;

    // find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return {
        success: false,
        statusCode: 401,
        message: 'Wrong Credentials',
      };
    }
    // compare by password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        statusCode: 401,
        message: 'Wrong Credentials',
      };
    }
    // Generate tokens
    const tokens = await this.generateUserTokens(user.userId);
    return {
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      data: { tokens, userId: user.userId },
    };
  }

  // POST : Refresh Token
  async refresh(refreshToken: string) {
    const token = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
    });

    if (!token) {
      return {
        success: false,
        statusCode: 401,
        message: 'Invalid refresh token',
      };
    }

    if (token.expiresAt < new Date()) {
      return {
        success: false,
        statusCode: 401,
        message: 'Refresh token expired',
      };
    }

    // Generate new tokens
    const tokens = await this.generateUserTokens(token.id);
    return {
      success: true,
      data: tokens,
    };
  }

  // generate access and refresh tokens
  async generateUserTokens(id: string) {
    const accessToken = this.jwtService.sign(
      { id },
      {
        expiresIn: '1h',
      },
    );
    const refreshToken = uuidv4();
    await this.saveRefreshToken(refreshToken, id);
    return { accessToken, refreshToken };
  }

  // Save refresh token to the database
  async saveRefreshToken(refreshToken: string, id: string) {
    await this.refreshTokenRepository.save({
      token: refreshToken,
      id: id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
  }

  // Logout
  async logout(userId: string) {
    try {
      await this.refreshTokenRepository.delete({ id: userId });
      return {
        success: true,
        statusCode: 200,
        message: 'User logged out successfully',
      };
    } catch (error) {
      return {
        success: false,
        statusCode: 500,
        message: 'Logout failed. Please Try Again Later',
      };
    }
  }

  // Reset Password
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userRepository.findOne({ where: { email: resetPasswordDto.email } });
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found with the provided email',
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);
    console.log("Password reset successfully");
    return {
      success: true,
      statusCode: 200,
      message: 'Password reset successfully',
    };
  }

  // Get User Data
  async getUserData(userId: string) {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found',
      };
    }
    return {
      success: true,
      statusCode: 200,
      message: 'User found',
      data: user,
    };
  }
}
