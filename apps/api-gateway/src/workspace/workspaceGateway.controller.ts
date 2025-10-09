import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import {type Response } from 'express';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { catchError, timeout } from 'rxjs/operators';
import { throwError, TimeoutError } from 'rxjs';
import {
  CreateWorkspaceDto,
  JoinWorkspaceDto,
  LeaveWorkspaceDto,
  GetWorkspaceDetailsDto,
  CreateGroupDto,
  JoinLeaveGroupDto,
  AssignAdminDto,
} from './dtos/workspace-gateway.dto';

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
  async createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @Request() req: any,
  ) {
    const userId = req.user.sub || req.user.userId || req.user.id;

    // Transform the DTO to match what the workspace service expects
    const workspaceServiceDto = {
      workspacename: createWorkspaceDto.workspacename,
      description: createWorkspaceDto.description,
    };

    try {
      const result = await this.workspaceServiceClient
        .send('create_workspace', {
          userId,
          createWorkspaceDto: workspaceServiceDto,
        })
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(
                () =>
                  new HttpException(
                    'Service timeout',
                    HttpStatus.REQUEST_TIMEOUT,
                  ),
              );
            }
            return throwError(
              () =>
                new HttpException(
                  err.message || 'Internal server error',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        )
        .toPromise();

      return {
        success: true,
        message: 'Workspace created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create workspace',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('join')
  async joinWorkspace(
    @Body() joinWorkspaceDto: JoinWorkspaceDto,
    @Request() req: any,
  ) {
    const userId = req.user.sub || req.user.userId || req.user.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const result = await this.workspaceServiceClient
        .send('join_workspace', { userId, joinWorkspaceDto })
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(
                () =>
                  new HttpException(
                    'Service timeout',
                    HttpStatus.REQUEST_TIMEOUT,
                  ),
              );
            }

            // Handle specific workspace errors
            if (err.message) {
              if (err.message.includes('already joined this workspace')) {
                return throwError(
                  () =>
                    new HttpException(
                      'You have already joined this workspace',
                      HttpStatus.CONFLICT,
                    ),
                );
              }
              if (
                err.message.includes('cannot join a workspace that you created')
              ) {
                return throwError(
                  () =>
                    new HttpException(
                      'You cannot join a workspace that you created. You are already the admin of this workspace',
                      HttpStatus.CONFLICT,
                    ),
                );
              }
              if (err.message.includes('Workspace not found')) {
                return throwError(
                  () =>
                    new HttpException(
                      'Workspace not found',
                      HttpStatus.NOT_FOUND,
                    ),
                );
              }
            }

            return throwError(
              () =>
                new HttpException(
                  err.message || 'Internal server error',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        )
        .toPromise();

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to join workspace',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('leave')
  async leaveWorkspace(
    @Body() leaveWorkspaceDto: LeaveWorkspaceDto,
    @Request() req: any,
  ) {
    const userId = req.user.sub || req.user.userId || req.user.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const result = await this.workspaceServiceClient
        .send('leave_workspace', { userId, leaveWorkspaceDto })
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(
                () =>
                  new HttpException(
                    'Service timeout',
                    HttpStatus.REQUEST_TIMEOUT,
                  ),
              );
            }

            // Handle specific workspace errors
            if (err.message) {
              if (err.message.includes('Workspace not found')) {
                return throwError(
                  () =>
                    new HttpException(
                      'Workspace not found',
                      HttpStatus.NOT_FOUND,
                    ),
                );
              }
              if (err.message.includes('not a member')) {
                return throwError(
                  () =>
                    new HttpException(
                      'You are not a member of this workspace',
                      HttpStatus.FORBIDDEN,
                    ),
                );
              }
              if (err.message.includes('admins cannot leave')) {
                return throwError(
                  () =>
                    new HttpException(
                      'Workspace admins cannot leave their own workspace. You must transfer admin rights or delete the workspace instead.',
                      HttpStatus.BAD_REQUEST,
                    ),
                );
              }
            }

            return throwError(
              () =>
                new HttpException(
                  err.message || 'Internal server error',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        )
        .toPromise();

      return {
        success: true,
        message: 'Successfully left the workspace',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to leave workspace',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getUserWorkspaces(@Request() req: any) {
    const userId = req.user.sub || req.user.userId || req.user.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const result = await this.workspaceServiceClient
        .send('get_user_workspaces', { userId })
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(
                () =>
                  new HttpException(
                    'Service timeout',
                    HttpStatus.REQUEST_TIMEOUT,
                  ),
              );
            }
            return throwError(
              () =>
                new HttpException(
                  err.message || 'Internal server error',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        )
        .toPromise();

      return {
        success: true,
        message: 'User workspaces retrieved successfully!!!',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve workspaces',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
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
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(
                () =>
                  new HttpException(
                    'Service timeout',
                    HttpStatus.REQUEST_TIMEOUT,
                  ),
              );
            }
            return throwError(
              () =>
                new HttpException(
                  err.message || 'Internal server error',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        )
        .toPromise();

      return {
        success: true,
        message: 'Available workspaces retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve available workspaces',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('details')
  async getWorkspaceDetails(
    @Body() getWorkspaceDetailsDto: GetWorkspaceDetailsDto,
    @Request() req: any,
  ) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    if (!userId) {
      throw new HttpException(
        'User ID not found in token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const result = await this.workspaceServiceClient
        .send('get_workspace_details', {
          userId,
          workspaceId: getWorkspaceDetailsDto.workspaceId,
        })
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(
                () =>
                  new HttpException(
                    'Service timeout',
                    HttpStatus.REQUEST_TIMEOUT,
                  ),
              );
            }

            // Handle specific workspace errors
            if (err.message) {
              if (err.message.includes('Workspace not found')) {
                return throwError(
                  () =>
                    new HttpException(
                      'Workspace not found',
                      HttpStatus.NOT_FOUND,
                    ),
                );
              }
              if (err.message.includes('not a member')) {
                return throwError(
                  () =>
                    new HttpException(
                      'You are not a member of this workspace',
                      HttpStatus.FORBIDDEN,
                    ),
                );
              }
            }

            return throwError(
              () =>
                new HttpException(
                  err.message || 'Internal server error',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        )
        .toPromise();

      return {
        success: true,
        message: 'Workspace details retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve workspace details',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':workspaceId/groups')
  async createGroup(
    @Param('workspaceId') workspaceId: string,
    @Body() createGroupDto: CreateGroupDto,
    @Request() req: any,
  ) {
    const userId = req.user.sub || req.user.userId || req.user.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const result = await this.workspaceServiceClient
        .send('create_group', { userId, workspaceId, createGroupDto })
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(
                () =>
                  new HttpException(
                    'Service timeout',
                    HttpStatus.REQUEST_TIMEOUT,
                  ),
              );
            }

            // Handle specific group creation errors
            if (err.message) {
              if (err.message.includes('Workspace not found')) {
                return throwError(
                  () =>
                    new HttpException(
                      'Workspace not found',
                      HttpStatus.NOT_FOUND,
                    ),
                );
              }
              if (err.message.includes('not a member')) {
                return throwError(
                  () =>
                    new HttpException(
                      'You are not a member of this workspace',
                      HttpStatus.FORBIDDEN,
                    ),
                );
              }
              if (err.message.includes('Only workspace admins')) {
                return throwError(
                  () =>
                    new HttpException(
                      'Only workspace admins can create groups',
                      HttpStatus.FORBIDDEN,
                    ),
                );
              }
              if (err.message.includes('group with this name already exists')) {
                return throwError(
                  () =>
                    new HttpException(
                      'A group with this name already exists in this workspace',
                      HttpStatus.CONFLICT,
                    ),
                );
              }
            }

            return throwError(
              () =>
                new HttpException(
                  err.message || 'Internal server error',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        )
        .toPromise();

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create group',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':workspaceId/groups')
  async getWorkspaceGroups(
    @Param('workspaceId') workspaceId: string,
    @Request() req: any,
  ) {
    const userId = req.user.sub || req.user.userId || req.user.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const result = await this.workspaceServiceClient
        .send('get_workspace_groups', { userId, workspaceId })
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(
                () =>
                  new HttpException(
                    'Service timeout',
                    HttpStatus.REQUEST_TIMEOUT,
                  ),
              );
            }

            // Handle specific errors
            if (err.message) {
              if (err.message.includes('Workspace not found')) {
                return throwError(
                  () =>
                    new HttpException(
                      'Workspace not found',
                      HttpStatus.NOT_FOUND,
                    ),
                );
              }
              if (err.message.includes('not a member')) {
                return throwError(
                  () =>
                    new HttpException(
                      'You are not a member of this workspace',
                      HttpStatus.FORBIDDEN,
                    ),
                );
              }
            }

            return throwError(
              () =>
                new HttpException(
                  err.message || 'Internal server error',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        )
        .toPromise();

      return {
        success: true,
        message: 'Groups retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve groups',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('groups/join-leave')
  async joinLeaveGroup(
    @Body() joinLeaveGroupDto: JoinLeaveGroupDto,
    @Request() req: any,
  ) {
    const userId = req.user.sub || req.user.userId || req.user.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const result = await this.workspaceServiceClient
        .send('join_leave_group', { userId, joinLeaveGroupDto })
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(
                () =>
                  new HttpException(
                    'Service timeout',
                    HttpStatus.REQUEST_TIMEOUT,
                  ),
              );
            }

            // Handle specific errors
            if (err.message) {
              if (err.message.includes('Group not found')) {
                return throwError(
                  () =>
                    new HttpException('Group not found', HttpStatus.NOT_FOUND),
                );
              }
              if (err.message.includes('not a member of the workspace')) {
                return throwError(
                  () =>
                    new HttpException(
                      'You are not a member of the workspace that contains this group',
                      HttpStatus.FORBIDDEN,
                    ),
                );
              }
            }

            return throwError(
              () =>
                new HttpException(
                  err.message || 'Internal server error',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        )
        .toPromise();

      return {
        success: true,
        message: result.message,
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to perform group operation',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-group-members/:groupId')
  async getGroupMembers(@Param('groupId') groupId: string) {
    try {
      const members = await this.workspaceServiceClient
        .send('get-group-members', { groupId })
        .toPromise();

      return {
        success: true,
        message: 'Group members retrieved successfully',
        data: members,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve group members',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async onModuleDestroy() {
    await this.workspaceServiceClient.close();
  }

  @Get('get-workspace-members/:workspaceId')
  async getWorkspaceMembers(@Param('workspaceId') workspaceId: string) {
    try {
      const members = await this.workspaceServiceClient
        .send('get-workspace-members', { workspaceId })
        .toPromise();
      return {
        success: true,
        message: 'Workspace members retrieved successfully',
        data: members,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve workspace members',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('assign-admin')
  async assignAdmin(@Body() assignAdminDto: AssignAdminDto) {
    try {
      const result = await this.workspaceServiceClient
        .send('assign-admin', assignAdminDto)
        .toPromise();
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to assign admin',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('add-members/:workspaceId')
  async addMembers(
    @Param('workspaceId') workspaceId: string,
    @Body() body: any,
    @Res() res: Response,
  ) {
    try {
      const result = await this.workspaceServiceClient
        .send('add_members', {
          workspaceId,
          emails: body.emails,
          workspaceName: body.workspaceName,
        })
        .toPromise();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to add members',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
