import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateProfilePictureFileDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}