import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, Timestamp } from 'typeorm';
import { User } from './user.entity';
import { Documents } from './documents.entity';

export enum UserRole {
  EDITOR = 'editor',
  VIEWER = 'viewer',
  OWNER = 'owner',
}

@Entity('collaborators')
export class Collaborators {
  @PrimaryColumn({ name: 'userid', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ name: 'docid', type: 'uuid' })
  docId: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.EDITOR })
  role: UserRole;

  @Column({ name: 'joinedat', type: 'timestamp' })
  joinedAt: Date;

  @Column({ name: 'isactive', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userid' })
  user: User;

  @ManyToOne(() => Documents, (doc) => doc.collaborators)
  @JoinColumn({ name: 'docid' })
  document: Documents;
}
