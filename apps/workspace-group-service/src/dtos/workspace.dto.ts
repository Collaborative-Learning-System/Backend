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

export class LeaveWorkspaceDto {
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

// Group DTOs
export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  groupname: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class GroupResponseDto {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;
  isMember: boolean;
}

export class WorkspaceGroupsResponseDto {
  groups: GroupResponseDto[];
  totalCount: number;
}

// Group Join/Leave DTOs
export class JoinLeaveGroupDto {
  @IsUUID()
  @IsNotEmpty()
  groupId: string;
}

export class GroupActionResponseDto {
  message: string;
  action: 'joined' | 'left';
  groupId: string;
  groupName: string;
}

// Chat DTOs
export class SendChatMessageDto {
  @IsUUID()
  @IsNotEmpty()
  groupId: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}

export class ChatMessageResponseDto {
  chatId: string;
  groupId: string;
  userId: string;
  text: string;
  sentAt: Date;
}

export class GetChatHistoryDto {
  @IsUUID()
  @IsNotEmpty()
  groupId: string;

  @IsOptional()
  limit?: number = 50;

  @IsOptional()
  offset?: number = 0;
}

export class ChatHistoryResponseDto {
  messages: ChatMessageResponseDto[];
  totalCount: number;
}
