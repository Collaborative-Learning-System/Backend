import { IsOptional } from 'class-validator';

export class ShareDocDto {
  @IsOptional()
  documentId: string;
  @IsOptional()
  emailList: {
    emails: string[];
  };
}
