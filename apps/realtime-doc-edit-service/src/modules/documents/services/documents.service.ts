import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documents } from '../entities/documents.entity';
import { Collaborators, UserRole } from '../entities/collaborators.entity';
import { DocumentSnapshots } from '../entities/document-snapshots.entity';
import { RedisService } from '../../redis/redis.service';
import * as Y from 'yjs';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(Documents)
    private readonly documentsRepository: Repository<Documents>,
    @InjectRepository(Collaborators)
    private readonly collaboratorRepository: Repository<Collaborators>,
    @InjectRepository(DocumentSnapshots)
    private readonly docRepo: Repository<DocumentSnapshots>,
  ) {}

  async createDocument(groupId: string, userId: string) {
    try {
      const newDocument = await this.documentsRepository.create({
        groupId: groupId,
        title: 'Untitled Document',
        ownerId: userId,
        createdAt: new Date(),
      });
      await this.documentsRepository.save(newDocument);

      const collaborator = await this.collaboratorRepository.create({
        userId: userId,
        docId: newDocument.docId,
        role: UserRole.OWNER,
        joinedAt: new Date(),
        isActive: true,
      });
      await this.collaboratorRepository.save(collaborator);
      // Initialize empty Yjs document and save initial snapshot
      const ydoc = new Y.Doc();
      const snapshot = Y.encodeStateAsUpdate(ydoc);

      const snap = await this.docRepo.create({
        docId: newDocument.docId,
        snapshot: Buffer.from(snapshot),
        createdAt: new Date(),
      });

      await this.docRepo.save(snap);
      return {
        success: true,
        document: newDocument,
        collaborator: collaborator,
      };
    } catch (error) {
      return { success: false, message: 'Failed to create document', error };
    }
  }

  async saveDocument(docId: string, ydoc: Y.Doc): Promise<void> {
    const update = Y.encodeStateAsUpdate(ydoc);

    console.log(
      'Document update.....................................................:',
      update,
    );
    // Save in Redis (fast)
    await this.redisService.setBuffer(`doc:${docId}`, Buffer.from(update));

    // Also persist snapshot in DB periodically
    const doc = await this.docRepo.update(
      { docId }, // where clause
      { snapshot: Buffer.from(update) }, // new values
    );
  }

  async loadDocument(docId: string): Promise<Y.Doc> {
    const cached = await this.redisService.getBuffer(`doc:${docId}`);
    const ydoc = new Y.Doc();

    if (cached) {
      Y.applyUpdate(ydoc, cached);
    } else {
      // Fallback: load snapshot from DB
      const doc = await this.docRepo.findOne({ where: { docId: docId } });
      if (doc?.snapshot) {
        Y.applyUpdate(ydoc, doc.snapshot);
      }
    }
    return ydoc;
  }

  async getDocuments(groupId: string) {
    try {
      const docData = await this.documentsRepository.find({
        where: { groupId: groupId },
        relations: ['collaborators'],
      });

      const result = await Promise.all(
        docData.map(async (doc) => {
          const count = await this.collaboratorRepository.count({
            where: { docId: doc.docId },
          });

          return {
            documentId: doc.docId,
            documentTitle: doc.title,
            createdAt: doc.createdAt,
            ownerId: doc.ownerId,
            collaboratorCount: count,
          };
        }),
      );

      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: 'Failed to fetch documents', error };
    }
  }

  async getDocumentData(documentId: string) {
    const doc = await this.documentsRepository.findOne({
      where: { docId: documentId },
    });
    if (!doc) {
      return { success: false, message: 'Document not found' };
    }
    return { success: true, data: doc };
  }
}
