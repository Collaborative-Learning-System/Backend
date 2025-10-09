import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  resourceid: string;

  @Column({ type: 'uuid', nullable: false })
  userid: string;

  @Column({ type: 'uuid', nullable: false })
  groupid: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  type: string;

  @Column({ type: 'text', nullable: false })
  storageurl: string;

  @CreateDateColumn({ name: 'uploadat' })
  uploadat: Date;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
