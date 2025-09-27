import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user_settings')
@Unique(['userId'])
export class UserSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'userid', type: 'uuid' })
  userId: string;

  @Column({ name: 'track_me', type: 'boolean', default: true })
  trackMe: boolean;

  @Column({ name: 'send_emails', type: 'boolean', default: true })
  sendEmails: boolean;
}
