import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Collaborators } from "./collaborators.entity";

@Entity('documents')
export class Documents {
  @PrimaryGeneratedColumn('uuid', { name: 'docid' })
  docId: string;

  @Column({ name: 'groupid', type: 'uuid' })
  groupId: string;

  @Column({ name: 'title', nullable: false, default: 'Untitled Document' })
  title: string;

  @Column({ name: 'ownerid', nullable: false })
  ownerId: string;

  @Column({
    name: 'createdat',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => Collaborators, (collab) => collab.document)
  collaborators: Collaborators[];
}