import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('documents')
export class Documents {
    @PrimaryGeneratedColumn('uuid', { name: 'docid' })
    docId: string;

    @Column({ name: 'title', nullable: false, default: 'Untitled Document' })
    title: string;

    @Column({ name: 'ownerid', nullable: false })
    ownerId: string;

    @Column({ name: 'createdat', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'lasteditedat', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    lastEditedAt: Date;
}