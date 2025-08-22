import { IsEmail, IsNotEmpty, MinLength, Matches } from "class-validator";

export class SignupDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long.'
  })
  @Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      },
  )
  password: string;
}