import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'process';
import { RpcException } from '@nestjs/microservices';

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
    const { name, email, password } = signupData;

    // check whether the email in use
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      // throw new BadRequestException('Email already in use');
      throw new RpcException({
        statusCode: 400,
        message: 'Email already in use',
      });

    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user entity and save it to the database
    await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    return "User registered successfully";
  }

  async login(loginData: LoginDto) {
    const { email, password } = loginData;

    // find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    // compare by password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    // Generate tokens
    return this.generateUserTokens(user.id);
  }

  // POST : Refresh Token
  async refresh(refreshToken: string) {
    const token = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken},
    });

    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (token.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    // console.log('Refresh token is valid:', token);
    // return "Refresh token is valid";
    // Generate new tokens
    return this.generateUserTokens(token.id);
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
}
