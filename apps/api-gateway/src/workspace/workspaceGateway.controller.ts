import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Param, 
  UseGuards, 
  Request,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { catchError, timeout } from 'rxjs/operators';
import { throwError, TimeoutError } from 'rxjs';
import { CreateWorkspaceDto, JoinWorkspaceDto, GetWorkspaceDetailsDto } from './dtos/workspace-gateway.dto';

@Controller('api/workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspaceGatewayController {
  private workspaceServiceClient: ClientProxy;

  constructor() {
    this.workspaceServiceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3003,
      },
    });
  }

  @Post()
  async createWorkspace(@Body() createWorkspaceDto: CreateWorkspaceDto, @Request() req: any) {

    const userId = req.user.sub || req.user.userId || req.user.id;

    // Transform the DTO to match what the workspace service expects
    const workspaceServiceDto = {
      workspacename: createWorkspaceDto.workspacename,
      description: createWorkspaceDto.description
    };
    
    try {
      const result = await this.workspaceServiceClient
        .send('create_workspace', { userId, createWorkspaceDto: workspaceServiceDto })
        .pipe(
          timeout(5000),
          catchError(err => {
            if (err instanceof TimeoutError) {
              return throwError(() => new HttpException('Service timeout', HttpStatus.REQUEST_TIMEOUT));
            }
            return throwError(() => new HttpException(err.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR));
          })
        )
        .toPromise();
      
      return {
        success: true,
        message: 'Workspace created successfully',
        data: result
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create workspace',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('join')
  async joinWorkspace(@Body() joinWorkspaceDto: JoinWorkspaceDto, @Request() req: any) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    
    if (!userId) {
      throw new HttpException('User ID not found in token', HttpStatus.UNAUTHORIZED);
    }
    
    try {
      const result = await this.workspaceServiceClient
        .send('join_workspace', { userId, joinWorkspaceDto })
        .pipe(
          timeout(5000),
          catchError(err => {
            if (err instanceof TimeoutError) {
              return throwError(() => new HttpException('Service timeout', HttpStatus.REQUEST_TIMEOUT));
            }
            
            // Handle specific workspace errors
            if (err.message) {
              if (err.message.includes('already joined this workspace')) {
                return throwError(() => new HttpException('You have already joined this workspace', HttpStatus.CONFLICT));
              }
              if (err.message.includes('cannot join a workspace that you created')) {
                return throwError(() => new HttpException('You cannot join a workspace that you created. You are already the admin of this workspace', HttpStatus.CONFLICT));
              }
              if (err.message.includes('Workspace not found')) {
                return throwError(() => new HttpException('Workspace not found', HttpStatus.NOT_FOUND));
              }
            }
            
            return throwError(() => new HttpException(err.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR));
          })
        )
        .toPromise();
      
      return {
        success: true,
        data: result
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to join workspace',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async getUserWorkspaces(@Request() req: any) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    
    if (!userId) {
      throw new HttpException('User ID not found in token', HttpStatus.UNAUTHORIZED);
    }
    
    try {
      const result = await this.workspaceServiceClient
        .send('get_user_workspaces', { userId })
        .pipe(
          timeout(5000),
          catchError(err => {
            if (err instanceof TimeoutError) {
              return throwError(() => new HttpException('Service timeout', HttpStatus.REQUEST_TIMEOUT));
            }
            return throwError(() => new HttpException(err.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR));
          })
        )
        .toPromise();
      
      return {
        success: true,
        message: 'User workspaces retrieved successfully!!!',
        data: result
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve workspaces',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('available')
  async getAllWorkspaces() {
    try {
      const result = await this.workspaceServiceClient
        .send('get_all_workspaces', {})
        .pipe(
          timeout(5000),
          catchError(err => {
            if (err instanceof TimeoutError) {
              return throwError(() => new HttpException('Service timeout', HttpStatus.REQUEST_TIMEOUT));
            }
            return throwError(() => new HttpException(err.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR));
          })
        )
        .toPromise();
      
      return {
        success: true,
        message: 'Available workspaces retrieved successfully',
        data: result
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve available workspaces',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('details')
  async getWorkspaceDetails(@Body() getWorkspaceDetailsDto: GetWorkspaceDetailsDto, @Request() req: any) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    if (!userId) {
      throw new HttpException('User ID not found in token', HttpStatus.UNAUTHORIZED);
    }
    
    try {
      const result = await this.workspaceServiceClient
        .send('get_workspace_details', { userId, workspaceId: getWorkspaceDetailsDto.workspaceId })
        .pipe(
          timeout(5000),
          catchError(err => {
            if (err instanceof TimeoutError) {
              return throwError(() => new HttpException('Service timeout', HttpStatus.REQUEST_TIMEOUT));
            }
            
            // Handle specific workspace errors
            if (err.message) {
              if (err.message.includes('Workspace not found')) {
                return throwError(() => new HttpException('Workspace not found', HttpStatus.NOT_FOUND));
              }
              if (err.message.includes('not a member')) {
                return throwError(() => new HttpException('You are not a member of this workspace', HttpStatus.FORBIDDEN));
              }
            }
            
            return throwError(() => new HttpException(err.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR));
          })
        )
        .toPromise();
      
      return {
        success: true,
        message: 'Workspace details retrieved successfully',
        data: result
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve workspace details',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async onModuleDestroy() {
    await this.workspaceServiceClient.close();
  }
}
