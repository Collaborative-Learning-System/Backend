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
    
    
    let accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;
    
    
    if (!accessToken) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        accessToken = authHeader.substring(7);
      }
    }

    if (!accessToken) throw new UnauthorizedException('No token found');

    try {
      const decoded = this.jwtService.verify(accessToken);
      req.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Invalid or expired token',
        data: {
          refreshToken: refreshToken,
        }
      });
    }
  }
}
