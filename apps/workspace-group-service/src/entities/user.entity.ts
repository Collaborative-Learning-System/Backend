import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkspaceMember } from './workspace_user.entity';
import { on } from 'events';
import { GroupMember } from './group-member.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'userid' })
  userId: string;

  @Column({ name: 'fullname', nullable: false })
  fullName: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ name: 'bio', nullable: true })
  bio: string;

  @Column({ name: 'profilepicurl', nullable: true })
  profilePicUrl: string;

  @OneToMany(() => WorkspaceMember, (workspaceMember) => workspaceMember.user, {
    onDelete: 'CASCADE',
  })
  workspaces: WorkspaceMember[];

  @OneToMany(() => GroupMember, (groupMember) => groupMember.user, {
    onDelete: 'CASCADE',
  })
  groups: GroupMember[];
}
