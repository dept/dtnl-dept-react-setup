# @dept/cache

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

If you have a load balancer with ISR/SSR your page/query caches can desync since there will be multiple instances of the application running.

## Implementations

| Implementation           | Type                | Link                                         |
| ------------------------ | ------------------- | -------------------------------------------- |
| Next Redis cache handler | Page cache          | [@dept/cache/next](/packages/cache/next)     |
| Apollo Redis cache       | GraphQL query cache | [@dept/cache/apollo](/packages/cache/apollo) |
