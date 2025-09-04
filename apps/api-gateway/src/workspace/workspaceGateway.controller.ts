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
import { CreateWorkspaceDto, JoinWorkspaceDto } from './dtos/workspace-gateway.dto';

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
    const userId = req.user.sub;
    console.log('Create Workspace DTO:----------------', createWorkspaceDto);
    try {
      const result = await this.workspaceServiceClient
        .send('create_workspace', { userId, createWorkspaceDto })
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
    const userId = req.user.sub;
    
    try {
      const result = await this.workspaceServiceClient
        .send('join_workspace', { userId, joinWorkspaceDto })
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
        message: 'Successfully joined workspace',
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
    const userId = req.user.sub;
    
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
        message: 'User workspaces retrieved successfully',
        data: result
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve workspaces',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async getWorkspaceById(@Param('id') workspaceId: string, @Request() req: any) {
    const userId = req.user.sub;
    
    try {
      const result = await this.workspaceServiceClient
        .send('get_workspace_by_id', { workspaceId, userId })
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
        message: 'Workspace retrieved successfully',
        data: result
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve workspace',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async onModuleDestroy() {
    await this.workspaceServiceClient.close();
  }
}
