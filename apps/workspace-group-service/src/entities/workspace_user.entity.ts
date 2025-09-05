import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Workspace } from './workspace.entity';

@Entity('workspace_user')
export class WorkspaceMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userid: string;

  @Column({ type: 'uuid', nullable: false })
  workspaceid: string;

  @Column({ type: 'varchar', length: 20, default: 'member' })
  role: string; // 'admin' | 'member'

}
