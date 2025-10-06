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
    try {
      const result = await this.collaboratorRepo.find({
        where: { docId: docId, isActive: true },
        relations: ['user'],
      });
      
      return {
        success: true,
        message: 'Collaborators fetched successfully',
        data: {
          collaborators: result.map((collaborator) => ({
            id: collaborator.user.userId,
            name: collaborator.user.fullName,
            role: collaborator.role, // This should be the collaboration role (owner, editor, viewer)
            email: collaborator.user.email,
            joinedAt: collaborator.joinedAt,
            isActive: collaborator.isActive,
          })),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch collaborators',
        error: error.message,
      };
    }
  }

  async addCollaborator(docId: string, userId: string) {
    try {
      // Check if collaborator already exists
      const existingCollaborator = await this.collaboratorRepo.findOne({
        where: { docId, userId },
      });

      if (existingCollaborator) {
        if (existingCollaborator.isActive) {
          return {
            success: false,
            message: 'User is already a collaborator on this document',
          };
        } else {
          // Reactivate the collaborator
          existingCollaborator.isActive = true;
          existingCollaborator.joinedAt = new Date();
          await this.collaboratorRepo.save(existingCollaborator);
          return {
            success: true,
            message: 'Collaborator reactivated successfully',
          };
        }
      }

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
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add collaborator',
        error: error.message,
      };
    }
  }

  async removeCollaborator(docId: string, userId: string) {
    try {
      const collaborator = await this.collaboratorRepo.findOne({
        where: { docId, userId, isActive: true },
      });

      if (!collaborator) {
        return {
          success: false,
          message: 'Collaborator not found or already inactive',
        };
      }

      // Don't allow removing the owner
      if (collaborator.role === UserRole.OWNER) {
        return {
          success: false,
          message: 'Cannot remove the document owner',
        };
      }

      // Set collaborator as inactive instead of deleting
      collaborator.isActive = false;
      await this.collaboratorRepo.save(collaborator);

      return {
        success: true,
        message: 'Collaborator removed successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to remove collaborator',
        error: error.message,
      };
    }
  }
}
