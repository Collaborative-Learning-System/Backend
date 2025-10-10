// src/redis/redis.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

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
}
