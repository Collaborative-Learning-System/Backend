import { Injectable } from '@nestjs/common';
import * as Y from 'yjs';
import { RedisService } from '../../redis/redis.service'; // wrapper for ioredis/redis client
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentSnapshots } from '../entities/document-snapshots.entity';
import { User } from '../entities/user.entity';
import { Collaborators } from '../entities/collaborators.entity';

@Injectable()
export class CollaborationService {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(DocumentSnapshots)
    private readonly docRepo: Repository<DocumentSnapshots>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Collaborators)
    private readonly collaboratorRepo: Repository<Collaborators>,
  ) {}

  async loadDocument(docId: string): Promise<Y.Doc> {
    const cached = await this.redisService.getBuffer(`doc:${docId}`);
    const ydoc = new Y.Doc();

    if (cached) {
      Y.applyUpdate(ydoc, cached);
    } else {
      // Fallback: load snapshot from DB
      const doc = await this.docRepo.findOne({ where: { id: docId } });
      if (doc?.snapshot) {
        Y.applyUpdate(ydoc, doc.snapshot);
      }
    }
    return ydoc;
  }

  async saveDocument(docId: string, ydoc: Y.Doc): Promise<void> {
    const update = Y.encodeStateAsUpdate(ydoc);

    // Save in Redis (fast)
    await this.redisService.setBuffer(`doc:${docId}`, Buffer.from(update));

    // Also persist snapshot in DB periodically
    await this.docRepo.update(docId, {
      snapshot: Buffer.from(update),
      createdAt: new Date(),
    });
  }

  async getCollaborators(docId: string) {
    console.log('test clb');
    const result = await this.collaboratorRepo.find({
      where: { docId: docId },
      relations: ['user'],
    });
    console.log(result);
    return {
      success: true,
      message: 'Collaborators fetched successfully',
      data: {
        collaborators: result.map((m) => ({
          id: m.user.userId,
          name: m.user.fullName,
          role: m.user.role,
        })),
      },
    };
  }
}
