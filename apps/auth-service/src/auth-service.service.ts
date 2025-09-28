import { Inject, Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { TokensDto } from './dtos/tokens.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    @Inject('user-service')
    private readonly userClient: ClientProxy,
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
    // await this.userClient
    //   .send({ cmd: 'save-user-settings' }, user?.userId)
    //   .toPromise();

    return {
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      data: { tokens, userId: user.userId },
    };
  }

  // POST : Refresh Token
  async refresh(refreshToken: string) {
    const user = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
    });

    if (!user?.token) {
      return {
        success: false,
        statusCode: 401,
        message: 'Invalid refresh token',
      };
    }
    if (user.expiresAt < new Date()) {
      return {
        success: false,
        statusCode: 401,
        message: 'Refresh token expired',
      };
    }

    // Generate new tokens
    const tokens = await this.generateUserTokens(user.id);
    return {
      success: true,
      statusCode: 200,
      message: 'Tokens refreshed successfully',
      data: { tokens },
    };
  }

  // generate access tokens
  async generateUserTokens(id: string) {
    const accessToken = this.jwtService.sign(
      { id },
      {
        expiresIn: '24h',
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
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  }

  // Logout
  async logout(userId: string) {
    try {
      const user = await this.refreshTokenRepository.findOne({
        where: { id: userId },
      });
      if (user) {
        await this.refreshTokenRepository.remove(user);
        return {
          success: true,
          statusCode: 200,
          message: 'User logged out successfully',
        };
      }
      return { success: false, statusCode: 404, message: 'User not found' };
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
    const user = await this.userRepository.findOne({
      where: { userId: resetPasswordDto.userId },
    });
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found',
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);
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
      data: {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        bio: user.bio,
      },
    };
  }

  // Find User By Email
  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not Exist with this email',
      };
    }
    return {
      success: true,
      statusCode: 200,
      message: 'User found',
      data: user,
    };
  }

  // Update Profile
  async updateProfile(updateData) {
    const user = await this.userRepository.findOne({
      where: { userId: updateData.userId },
    });
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found',
      };
    }

    const IsEmailExist = await this.userRepository.findOne({
      where: { email: updateData.email },
    });
    if (IsEmailExist && IsEmailExist.email !== user.email) {
      return {
        success: false,
        statusCode: 409,
        message: 'Email already exists',
      };
    }
    user.fullName = updateData.fullName;
    user.email = updateData.email;
    user.bio = updateData.bio;
    await this.userRepository.save(user);
    return {
      success: true,
      statusCode: 200,
      message: 'Profile updated successfully',
    };
  }

  // Delete User
  async deleteUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found',
      };
    }
    await this.userRepository.remove(user);
    return {
      success: true,
      statusCode: 200,
      message: 'Account Removed successfully',
    };
  }

  // Find User By Id
  async findUserById(userId: string) {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      return;
    }
    return {
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
    };
  }
}
