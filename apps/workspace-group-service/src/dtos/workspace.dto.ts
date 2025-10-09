import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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
  adminName: string;
  memberCount?: number;
  role?: string; // 'admin' | 'member'
}

export class UserWorkspacesResponseDto {
  workspaces: WorkspaceResponseDto[];
  totalCount: number;
}

export class AssignAdminDto {
  @IsUUID()
  @IsNotEmpty()
  workspaceId: string;

  @IsUUID()
  @IsNotEmpty()
  newAdminId: string;
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
export class ResourceAttachmentDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @IsString()
  @IsNotEmpty()
  base64Data: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class SendChatMessageDto {
  @IsUUID()
  @IsNotEmpty()
  groupId: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ResourceAttachmentDto)
  attachment?: ResourceAttachmentDto;
}

export class ChatMessageResponseDto {
  chatId: string;
  groupId: string;
  userId: string;
  userName?: string;
  text?: string;
  messageType: 'text' | 'resource';
  resource?: ResourceResponseDto;
  sentAt: Date;
}

export class ResourceResponseDto {
  resourceId: string;
  title: string;
  type: 'image' | 'video' | 'pdf';
  storageUrl: string;
  description?: string;
  uploadedAt: Date;
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
