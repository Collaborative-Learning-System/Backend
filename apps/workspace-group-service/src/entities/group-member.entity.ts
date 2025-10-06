import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity('group_member')
export class GroupMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  groupid: string;

  @Column({ type: 'uuid', nullable: false })
  userid: string;

  @ManyToOne(() => Group, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupid' })
  group: Group;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userid' })
  user: User;
}
