import { FIVE_MINUTES, TWO_MINUTES, isDevelopment } from '@dept/web/src/constants/cache';
import { InvalidationPolicyCache, RenewalPolicy } from '@nerdwallet/apollo-cache-policies';
import { PersistentStorage, persistCache } from 'apollo3-cache-persist';

import { commandOptions, createClient } from 'redis';

const CACHE_TTL = (isDevelopment ? TWO_MINUTES : FIVE_MINUTES) * 1000;

const memoryCache = new InvalidationPolicyCache({
  resultCacheMaxSize: Math.pow(2, 18),
  invalidationPolicies: {
    // 5 minutes as default TTL cache (30 secs in development)
    timeToLive: CACHE_TTL,
    renewalPolicy: RenewalPolicy.WriteOnly,
    /**
     * By adding types below (the key should be the __typename),
     * you can override cache durations for certain types.
     * Example:
     */
    // types: {
    //   Navigation: {
    //     timeToLive: LONGER_CACHE_TTL,
    //   },
    // },
  },
});

// Only use redis if the env variables are set
if (process.env.REDIS_HOST_NAME && process.env.REDIS_PORT) {
  type RedisStorage = ReturnType<typeof createClient>;

  const REDIS_PREFIX = `apollo:`;
  const REDIS_CACHE_TIMEOUT = 1000;

  const redisClient = createClient({
    // url: `redis://${process.env.REDIS_HOST_NAME}:${process.env.REDIS_PORT}`,
    url: `redis://localhost:6379`,
    name: `cache-handler:${REDIS_PREFIX}${process.env.PORT ?? process.pid}`,
  });

  const getTimeoutRedisCommandOptions = (timeoutMs: number) =>
    commandOptions({ signal: AbortSignal.timeout(timeoutMs) });

  const generateRedisKey = (key: string) => `${REDIS_PREFIX}${key}`;

  const assertClientIsReady = (client: RedisStorage) => {
    if (!client.isReady) {
      throw new Error('Redis client is not ready yet or connection is lost. Keep trying...');
    }
  };

  class StorageWrapper implements PersistentStorage<string | null> {
    protected storage: RedisStorage;

    constructor(storage: RedisStorage) {
      this.storage = storage;
    }

    async getItem(key: string) {
      assertClientIsReady(this.storage);

      const result = await this.storage.get(
        getTimeoutRedisCommandOptions(REDIS_CACHE_TIMEOUT),
        generateRedisKey(key),
      );

      if (!result) {
        return null;
      }

      const cacheValue = JSON.parse(result);

      if (!cacheValue) {
        return null;
      }

      return cacheValue;
    }

    async removeItem(key: string) {
      assertClientIsReady(this.storage);
      await this.storage.del(key);
    }

    async setItem(key: string, value: string | null) {
      assertClientIsReady(this.storage);

      if (value !== null) {
        await this.storage.set(
          getTimeoutRedisCommandOptions(REDIS_CACHE_TIMEOUT),
          generateRedisKey(key),
          value,
          {
            PX: CACHE_TTL,
          },
        );
        return;
      } else {
        await this.removeItem(key);
        return;
      }
    }
  }

  await redisClient.connect();

  await persistCache({
    cache: memoryCache,
    storage: new StorageWrapper(redisClient),
    debounce: 200,
    maxSize: 10485760,
  });
}

export const cache = memoryCache;
