import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class JoinWorkspaceDto {
  @IsUUID()
  @IsNotEmpty()
  workspaceId: string;
}
