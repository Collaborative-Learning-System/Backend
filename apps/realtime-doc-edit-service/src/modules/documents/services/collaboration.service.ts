import { Injectable } from '@nestjs/common';
import * as Y from 'yjs';
import { RedisService } from '../../redis/redis.service'; // wrapper for ioredis/redis client
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentSnapshots } from '../entities/document-snapshots.entity';
import { User } from '../entities/user.entity';
import { Collaborators, UserRole } from '../entities/collaborators.entity';

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



  async getCollaborators(docId: string) {
    const result = await this.collaboratorRepo.find({
      where: { docId: docId },
      relations: ['user'],
    });
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

  async addCollaborator(docId: string, userId: string) {
    const newCollaborator = await this.collaboratorRepo.create({
      userId: userId,
      docId: docId,
      role: UserRole.EDITOR,
      joinedAt: new Date(),
      isActive: true,
    });
    await this.collaboratorRepo.save(newCollaborator);
    return {
      success: true,
      message: 'Collaborator added successfully',
    };
  }
}
