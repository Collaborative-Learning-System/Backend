import { Injectable } from '@nestjs/common';
import * as Y from 'yjs';
import { RedisService } from '../../redis/redis.service'; // wrapper for ioredis/redis client
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documents } from '../entities/documents.entity';

@Injectable()
export class CollaborationService {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(Document)
    private readonly docRepo: Repository<Document>,
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
    await this.redisService.setBuffer(`doc:${docId}`, update);

    // Also persist snapshot in DB periodically
    await this.docRepo.update(docId, {
      snapshot: Buffer.from(update),
      lastEditedAt: new Date(),
    });
  }
}
