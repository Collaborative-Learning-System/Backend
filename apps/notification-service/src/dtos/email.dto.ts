import { IsEmpty } from 'class-validator';

export class EmailDto {
  @IsEmpty()
  email: string;
}
