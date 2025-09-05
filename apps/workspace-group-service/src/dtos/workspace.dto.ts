import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  workspacename: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class JoinWorkspaceDto {
  @IsUUID()
  @IsNotEmpty()
  workspaceId: string;
}

export class GetUserWorkspacesDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

export class WorkspaceResponseDto {
  id: string;
  name: string;
  description?: string;
  adminId: string;
  memberCount?: number;
  role?: string; // 'admin' | 'member'
}

export class UserWorkspacesResponseDto {
  workspaces: WorkspaceResponseDto[];
  totalCount: number;
}

export class WorkspaceSelectionDto {
  id: string;
  name: string;
}

export class AllWorkspacesResponseDto {
  workspaces: WorkspaceSelectionDto[];
  totalCount: number;
}
