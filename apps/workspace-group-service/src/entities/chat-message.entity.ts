import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Resource } from './resource.entity';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  chatid: string;

  @Column({ type: 'uuid', nullable: false })
  groupid: string;

  @Column({ type: 'uuid', nullable: false })
  userid: string;


  @Column({ type: 'text', nullable: false })
  text: string; 

  

  @Column({ type: 'uuid', nullable: true })
  resourceid?: string;

  @Column({ type: 'varchar', length: 20, default: 'text' })
  messagetype: 'text' | 'resource';


  @CreateDateColumn()
  sentat: Date;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'groupid' })
  group: Group;

  @ManyToOne(() => Resource, { nullable: true })
  @JoinColumn({ name: 'resourceid' })
  resource?: Resource;
}
