import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './group.entity';

@Entity('group_member')
export class GroupMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  groupid: string;

  @Column({ type: 'uuid', nullable: false })
  userid: string;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'groupid' })
  group: Group;
}
