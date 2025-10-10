import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn('uuid', { name: 'notificationid' })
  notificationId: string;

  @Column({ name: 'userid', type: 'uuid' })
  userId: string;

  @Column({ name: 'notification' })
  notification: string;

  @Column({ name: 'timestamp' })
  timestamp: Date;

  @Column({ name: 'isread', default: false })
  isRead: boolean;

  @Column({ name: 'link', nullable: true })
  link?: string;
}
