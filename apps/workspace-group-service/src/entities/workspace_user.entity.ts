import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Workspace } from './workspace.entity';
import { User } from './user.entity';

@Entity('workspace_user')
export class WorkspaceMember {
  @PrimaryColumn({ type: 'uuid' })
  userid: string;

  @PrimaryColumn({ type: 'uuid' })
  workspaceid: string;

  @Column({ type: 'varchar', length: 20, default: 'member' })
  role: string;

  @ManyToOne(() => Workspace, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workspaceid' })
  workspace: Workspace;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userid' })
  user: User;
}
