import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('workspace')
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  workspaceid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  workspacename: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  
}
