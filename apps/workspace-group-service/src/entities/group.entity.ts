import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Workspace } from './workspace.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  groupid: string;

  @Column({ type: 'uuid', nullable: false })
  workspaceid: string;

  @Column({ type: 'varchar', length: 255 })
  groupname: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Workspace)
  @JoinColumn({ name: 'workspaceid' })
  workspace: Workspace;
}
