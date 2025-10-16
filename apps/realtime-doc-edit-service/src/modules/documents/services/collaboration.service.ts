import { Injectable } from '@nestjs/common';
import * as Y from 'yjs';
import { RedisService } from '../../redis/redis.service'; // wrapper for ioredis/redis client
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentSnapshots } from '../entities/document-snapshots.entity';
import { User } from '../entities/user.entity';
import { Collaborators, UserRole } from '../entities/collaborators.entity';
import { UserPresence, OnlineUser, CursorPosition } from '../dtos/presence.dto';

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
            role: collaborator.role, 
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
            success: true,
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

  // User presence and online status management
  async handleUserJoin(docId: string, userId: string): Promise<{ success: boolean; user?: any; message?: string }> {
    try {
      // Get user info from database
      const user = await this.userRepo.findOne({ where: { userId } });
      if (!user) {
        return { success: false, message: 'User not found' };
      }

      // Set user presence in Redis
      const presence: UserPresence = {
        userId,
        name: user.fullName,
        docId,
        joinedAt: new Date(),
        lastActivity: new Date(),
        isOnline: true,
      };

      await this.redisService.setUserPresence(docId, userId, presence);
      await this.redisService.addUserToDocumentRoom(docId, userId);

      return { 
        success: true, 
        user: { 
          userId: user.userId, 
          name: user.fullName 
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to handle user join',
      };
    }
  }

  async handleUserLeave(docId: string, userId: string): Promise<void> {
    try {
      await this.redisService.setUserOffline(docId, userId);
      await this.redisService.removeUserFromDocumentRoom(docId, userId);
    } catch (error) {
      console.error('Error handling user leave:', error);
    }
  }

  async updateUserCursor(docId: string, userId: string, cursor: CursorPosition): Promise<void> {
    try {
      await this.redisService.updateUserCursor(docId, userId, cursor);
    } catch (error) {
      console.error('Error updating user cursor:', error);
    }
  }

  async updateUserActivity(docId: string, userId: string): Promise<void> {
    try {
      await this.redisService.updateUserActivity(docId, userId);
    } catch (error) {
      console.error('Error updating user activity:', error);
    }
  }

  async getOnlineUsers(docId: string): Promise<OnlineUser[]> {
    try {
      return await this.redisService.getDocumentOnlineUsers(docId);
    } catch (error) {
      console.error('Error getting online users:', error);
      return [];
    }
  }

  async handleHeartbeat(docId: string, userId: string): Promise<void> {
    try {
      await this.redisService.updateUserActivity(docId, userId);
    } catch (error) {
      console.error('Error handling heartbeat:', error);
    }
  }

  async getUserPresence(docId: string, userId: string): Promise<UserPresence | null> {
    try {
      return await this.redisService.getUserPresence(docId, userId);
    } catch (error) {
      console.error('Error getting user presence:', error);
      return null;
    }
  }

  async cleanupInactiveUsers(docId: string): Promise<void> {
    try {
      const onlineUsers = await this.getOnlineUsers(docId);
      const now = Date.now();
      
      // Remove users who have been inactive for more than 5 minutes
      for (const user of onlineUsers) {
        if (user.lastActivity && (now - user.lastActivity.getTime() > 300000)) {
          await this.redisService.removeUserPresence(docId, user.userId);
        }
      }
    } catch (error) {
      console.error('Error cleaning up inactive users:', error);
    }
  }

  async handleUserLeaveWorkspace(userId: string, groupId?: string): Promise<void> {
    try {
      // If groupId is provided, clean up from all documents in that group
      if (groupId) {
        // Get all rooms and check if user is in them
        const rooms = await this.redisService.getAllRoomKeys();
        
        for (const room of rooms) {
          const docId = room.replace('room:', '');
          const users = await this.redisService.getDocumentRoomUsers(docId);
          
          if (users.includes(userId)) {
            await this.handleUserLeave(docId, userId);
          }
        }
      }

      // Also clean up any socket mapping
      await this.redisService.removeUserSocket(userId);
    } catch (error) {
      console.error('Error handling user leave workspace:', error);
    }
  }

  async forceUserOffline(userId: string): Promise<void> {
    try {
      // Set user offline in all documents they might be in
      const keys = await this.redisService.getAllPresenceKeys(userId);
      
      for (const key of keys) {
        const docId = key.split(':')[1]; // Extract docId from presence:docId:userId
        if (docId) {
          await this.redisService.setUserOffline(docId, userId);
        }
      }

      await this.redisService.removeUserSocket(userId);
    } catch (error) {
      console.error('Error forcing user offline:', error);
    }
  }
}
