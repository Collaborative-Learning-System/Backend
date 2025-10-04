import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Workspace } from './workspace.entity';
import { GroupMember } from './group-member.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  groupid: string;

  @Column({ type: 'uuid', nullable: false })
  workspaceid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  groupname: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Workspace)
  @JoinColumn({ name: 'workspaceid' })
  workspace: Workspace;

  @OneToMany(() => GroupMember, (groupMember) => groupMember.group, { cascade: true, onDelete: 'CASCADE' })
  members: GroupMember[];
}
