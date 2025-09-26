import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('logging')
export class Logging {
  @PrimaryGeneratedColumn('uuid', { name: 'activityid' })
  activityId: string;

  @Column({ name: 'userid' })
  userId: string;

  @Column({ name: 'activity' })
  activity: string;

  @Column({ name: 'timestamp' })
  timestamp: Date;
}