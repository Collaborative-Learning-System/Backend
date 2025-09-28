import { IsNotEmpty } from "class-validator";

export class ActivityDto {
    @IsNotEmpty({ message: 'User ID is required' })
    userId: string;

    @IsNotEmpty({ message: 'Activity is required' })
    activity: string;

    @IsNotEmpty({ message: 'Timestamp is required' })
    timestamp: Date;
}