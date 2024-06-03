// @ts-check
import { CacheHandler } from '@neshca/cache-handler';
import createLruHandler from '@neshca/cache-handler/local-lru';
import createRedisHandler from '@neshca/cache-handler/redis-strings';
import { createClient } from 'redis';

CacheHandler.onCreation(async ({ buildId }) => {
  if (!process.env.REDIS_HOST_NAME || !process.env.REDIS_PORT) {
    console.warn('Make sure that REDIS_URL is added to the .env.local file and loaded properly.');
  }

  const PREFIX = `${buildId}:nextjs:`;

  /** @type {import("redis").RedisClientType} */
  const client = createClient({
    url: `redis://${process.env.REDIS_HOST_NAME}:${process.env.REDIS_PORT}`,
    name: `cache-handler:${PREFIX}${process.env.PORT ?? process.pid}`,
  });

  client.on('error', error => {
    console.error('Redis client error:', error);
  });

  console.info('Connecting Redis client...');
  await client.connect();
  console.info('Redis client connected.');

  const redisHandler = createRedisHandler({
    client,
    keyPrefix: PREFIX,
  });

  const localHandler = createLruHandler();

  return {
    handlers: [redisHandler, localHandler],
  };
});

export default CacheHandler;
