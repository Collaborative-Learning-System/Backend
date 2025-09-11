import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) throw new UnauthorizedException('No token found');

    try {
      const decoded = this.jwtService.verify(accessToken);
      console.log("access token is valid");
      req.user = decoded;
      return true;
    } catch (error) {
      console.log("access token error", error);
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid or expired token',
      });
    }
  }
}
