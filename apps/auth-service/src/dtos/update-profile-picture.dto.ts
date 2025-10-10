import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateProfilePictureDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  imageBase64: string;
}