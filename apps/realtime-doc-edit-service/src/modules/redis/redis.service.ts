// src/redis/redis.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { UserPresence, OnlineUser, CursorPosition } from '../documents/dtos/presence.dto';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  onModuleInit() {
    this.client = new Redis({
      host: 'redis',
      port: 6379,
    });
  }

  onModuleDestroy() {
    return this.client.quit();
  }

  async getBuffer(key: string): Promise<Buffer | null> {
    const data = await this.client.getBuffer(key);
    return data ? Buffer.from(data) : null;
  }

  async setBuffer(
    key: string,
    value: Buffer,
    ttlSeconds?: number,
  ): Promise<void> {
    if (ttlSeconds) {
      await this.client.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async publish(channel: string, message: string): Promise<void> {
    await this.client.publish(channel, message);
  }

  async subscribe(
    channel: string,
    handler: (msg: string) => void,
  ): Promise<void> {
    const sub = new Redis();
    await sub.subscribe(channel);
    sub.on('message', (_, message) => handler(message));
  }

  async delete(key: string): Promise<number> {
    return await this.client.del(key);
  }

  // User presence management
  async setUserPresence(docId: string, userId: string, presence: UserPresence): Promise<void> {
    const key = `presence:${docId}:${userId}`;
    await this.client.hset(key, {
      userId: presence.userId,
      name: presence.name,
      docId: presence.docId,
      joinedAt: presence.joinedAt.toISOString(),
      lastActivity: presence.lastActivity.toISOString(),
      isOnline: presence.isOnline ? '1' : '0',
      cursor: presence.cursor ? JSON.stringify(presence.cursor) : '',
    });
    // Set expiry for presence data (5 minutes)
    await this.client.expire(key, 300);
  }

  async getUserPresence(docId: string, userId: string): Promise<UserPresence | null> {
    const key = `presence:${docId}:${userId}`;
    const data = await this.client.hgetall(key);
    
    if (!data || !data.userId) {
      return null;
    }

    return {
      userId: data.userId,
      name: data.name,
      docId: data.docId,
      joinedAt: new Date(data.joinedAt),
      lastActivity: new Date(data.lastActivity),
      isOnline: data.isOnline === '1',
      cursor: data.cursor ? JSON.parse(data.cursor) : undefined,
    };
  }

  async getDocumentOnlineUsers(docId: string): Promise<OnlineUser[]> {
    const pattern = `presence:${docId}:*`;
    const keys = await this.client.keys(pattern);
    
    if (keys.length === 0) {
      return [];
    }

    const pipeline = this.client.pipeline();
    keys.forEach(key => {
      pipeline.hgetall(key);
    });
    
    const results = await pipeline.exec();
    const users: OnlineUser[] = [];

    results?.forEach((result) => {
      if (result && result[0] === null) { // No error
        const data = result[1] as any;
        if (data && data.userId) {
          const isActive = Date.now() - new Date(data.lastActivity).getTime() < 60000; // Active within last minute
          users.push({
            userId: data.userId,
            name: data.name,
            isOnline: data.isOnline === '1',
            isActive,
            lastActivity: new Date(data.lastActivity),
            cursor: data.cursor ? JSON.parse(data.cursor) : undefined,
          });
        }
      }
    });

    return users;
  }

  async updateUserCursor(docId: string, userId: string, cursor: CursorPosition): Promise<void> {
    const key = `presence:${docId}:${userId}`;
    await this.client.hset(key, {
      cursor: JSON.stringify(cursor),
      lastActivity: new Date().toISOString(),
    });
    await this.client.expire(key, 300);
  }

  async updateUserActivity(docId: string, userId: string): Promise<void> {
    const key = `presence:${docId}:${userId}`;
    await this.client.hset(key, 'lastActivity', new Date().toISOString());
    await this.client.expire(key, 300);
  }

  async removeUserPresence(docId: string, userId: string): Promise<void> {
    const key = `presence:${docId}:${userId}`;
    await this.client.del(key);
  }

  async setUserOffline(docId: string, userId: string): Promise<void> {
    const key = `presence:${docId}:${userId}`;
    await this.client.hset(key, 'isOnline', '0');
    await this.client.expire(key, 60); // Keep offline status for 1 minute
  }

  // Socket ID mapping for user session management
  async setUserSocket(userId: string, socketId: string): Promise<void> {
    await this.client.set(`socket:${userId}`, socketId, 'EX', 3600); // 1 hour
  }

  async getUserSocket(userId: string): Promise<string | null> {
    return await this.client.get(`socket:${userId}`);
  }

  async removeUserSocket(userId: string): Promise<void> {
    await this.client.del(`socket:${userId}`);
  }

  // Document room management
  async addUserToDocumentRoom(docId: string, userId: string): Promise<void> {
    await this.client.sadd(`room:${docId}`, userId);
    await this.client.expire(`room:${docId}`, 7200); // 2 hours
  }

  async removeUserFromDocumentRoom(docId: string, userId: string): Promise<void> {
    await this.client.srem(`room:${docId}`, userId);
  }

  async getDocumentRoomUsers(docId: string): Promise<string[]> {
    return await this.client.smembers(`room:${docId}`);
  }

  async getAllRoomKeys(): Promise<string[]> {
    return await this.client.keys('room:*');
  }

  async getAllPresenceKeys(userId?: string): Promise<string[]> {
    const pattern = userId ? `presence:*:${userId}` : 'presence:*';
    return await this.client.keys(pattern);
  }
}
