import { IsArray, IsNotEmpty } from 'class-validator';

export class NotificationDataDto {
  @IsArray({ message: 'Users must be an array' })
  users: string[];
  @IsNotEmpty({ message: 'Notification is required' })
  notification: string;
  @IsNotEmpty({ message: 'Timestamp is required' })
  timestamp: Date;
}
