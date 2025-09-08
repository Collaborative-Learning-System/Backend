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


export class GetWorkspaceDetailsDto {
  @IsUUID()
  @IsNotEmpty()
  workspaceId: string;
}



// DTO for getting group details

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  groupname: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class JoinLeaveGroupDto {
  @IsUUID()
  @IsNotEmpty()
  groupId: string;
}
