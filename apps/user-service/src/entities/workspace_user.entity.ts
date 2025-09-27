import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspace } from './workspace.entity';

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
}
