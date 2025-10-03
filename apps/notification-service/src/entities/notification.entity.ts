import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn('uuid', { name: 'notificationid' })
  notificationId: string;

  @Column({ name: 'userid' })
  userId: string;

  @Column({ name: 'notification' })
  notification: string;

  @Column({ name: 'timestamp' })
  timestamp: Date;
}
