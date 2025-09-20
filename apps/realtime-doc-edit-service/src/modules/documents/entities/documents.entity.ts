import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('documents')
export class Documents {
    @PrimaryGeneratedColumn('uuid')
    docId: string;

    @Column({ name: 'title', nullable: false, default: 'Untitled Document' })
    title: string;

    @Column({ name: 'ownerid', nullable: false })
    ownerId: string;

    @Column({ name: 'createdat', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Timestamp;

    @Column({ name: 'lastEditedAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    lastEditedAt: Timestamp;
}