import { IsEmail, IsNotEmpty, MinLength, Matches, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  fullName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsOptional()
  bio: string;
}
