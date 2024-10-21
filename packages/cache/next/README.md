## NextJS Custom page cache handler

This package uses Redis with the `@neshca/cache-handler` [package](https://caching-tools.github.io/next-shared-cache).

The cache handler property of NextJS only loads when in production mode (`yarn web build && yarn web start`).

To enable the cache handler you need to:

**Install the dependencies**

```bash
yarn web add @dept/cache
```

**Add the following lines to the [next.config.mjs](/apps/web/config/next-config.mjs)**

```typescript
cacheHandler: path.resolve('../../packages/cache/next/index.mjs'),
cacheMaxMemorySize: 0,
```

_This will tell NextJS to not use memory cache but always use Redis to lookup the page cache._

and configure your Redis client environment variables:

```bash
REDIS_HOST_NAME=
REDIS_PORT=
REDIS_PASSWORD= // optional
NEXT_PRIVATE_DEBUG_CACHE= // boolean - optional for debugging
```

#### Local testing

For local testing you can run Redis using Docker with the following command:

```bash
docker run -dp 6379:6379 --rm --name test-redis redis:6.2-alpine redis-server --loglevel warning
```

and the following `.env` variables:

```bash
REDIS_HOST_NAME=localhost
REDIS_PORT=6379
NEXT_PRIVATE_DEBUG_CACHE=1
```

##### Debugging

To monitor your local Redis instance you can access it using the following commands:

**Get your Redis container ID**

```bash
docker ps
```

**Start live monitor session**

```bash
docker exec -i -t {docker-container-id} sh
redis-cli MONITOR
```

_This will start a live logging session for all requests being made to Redis_
