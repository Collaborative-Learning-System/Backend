import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('document_snapshots')
export class DocumentSnapshots {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'uuid', name: 'docid' })
  docId: string;

  @Column({ type: 'bytea', name: 'snapshot' }) // stores Yjs document state
  snapshot: Buffer;

  @Column({ name: 'createdat', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
