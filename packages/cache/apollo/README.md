## NextJS Custom Apollo query cache

This package uses Apollo with the `apollo3-cache-persist` [package](https://github.com/apollographql/apollo-cache-persist) and `@nerdwallet/apollo-cache-policies` [package](https://www.npmjs.com/package/@nerdwallet/apollo-cache-policies).

For configuratioon options please follow the package options mentioned above.

To enable the Apoollo query cache handler you need to:

**Install the dependencies**

```bash
yarn web add --dev apollo3-cache-persist @nerdwallet/apollo-cache-policies
```

**Add the cache handler to your Apollo client**

```typescript
export const apolloClient = new ApolloClient({
  ...
  cache,
  ...
});
```

_This will tell Apollo to use the Redis cache._

and configure your Redis client environment variables:

```bash
REDIS_HOST_NAME=
REDIS_PORT=
REDIS_PASSWORD= // optional
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
