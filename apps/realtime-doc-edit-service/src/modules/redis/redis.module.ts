// src/redis/redis.module.ts
import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global() // makes Redis available app-wide without re-import
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
