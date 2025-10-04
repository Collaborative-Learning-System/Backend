import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Group } from './group.entity';
import { WorkspaceMember } from './workspace_user.entity';

@Entity('workspace')
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  workspaceid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  workspacename: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Group, (group) => group.workspace, { onDelete: 'CASCADE' })
  groups: Group[];

  @OneToMany(() => WorkspaceMember, (member) => member.workspace, { cascade: true, onDelete: 'CASCADE' })
  members: WorkspaceMember[];
}
