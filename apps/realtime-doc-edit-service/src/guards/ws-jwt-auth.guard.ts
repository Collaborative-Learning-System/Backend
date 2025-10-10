import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

export interface AuthenticatedSocket extends Socket {
  userId?: string;
  userGroups?: string[];
  user?: any;
}

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: AuthenticatedSocket = context.switchToWs().getClient();
    
    try {
      // First try to get token from cookies in handshake
      const cookies = this.parseCookies(client.handshake.headers.cookie);
      let accessToken = cookies?.accessToken;
      
      // Fallback to auth token if no cookie
      if (!accessToken) {
        accessToken = client.handshake.auth?.token || 
                     client.handshake.headers?.authorization?.replace('Bearer ', '');
      }

      if (!accessToken) {
        throw new UnauthorizedException('No token found');
      }

      // Verify JWT token
      const decoded = this.jwtService.verify(accessToken);
      
      // Store user information in the socket
      client.user = decoded;
      client.userId = decoded.id || decoded.userId || decoded.sub;
      
      return true;
    } catch (error) {
      console.error('WebSocket authentication failed:', error);
      return false;
    }
  }

  private parseCookies(cookieHeader?: string): { [key: string]: string } {
    if (!cookieHeader) return {};
    
    return cookieHeader
      .split(';')
      .reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
          cookies[name] = decodeURIComponent(value);
        }
        return cookies;
      }, {} as { [key: string]: string });
  }
}