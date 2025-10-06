import { IsArray } from 'class-validator';
export class SuggestedWorkspacesDto {
  @IsArray()
  myWorkspaces: any[];

  @IsArray()
  suggestedWorkspaces: any[];
}
