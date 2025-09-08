import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Group } from './group.entity';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  chatid: string;

  @Column({ type: 'uuid', nullable: false })
  groupid: string;

  @Column({ type: 'uuid', nullable: false })
  userid: string;

  @Column({ type: 'text' })
  text: string;

  @CreateDateColumn()
  sentat: Date;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'groupid' })
  group: Group;
}
