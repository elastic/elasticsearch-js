# Client.indices.clearCache

Clear the cache. Clear the cache of one or more indices. For data streams, the API clears the caches of the stream's backing indices. By default, the clear cache API clears all caches. To clear only specific caches, use the `fielddata`, `query`, or `request` parameters. To clear the cache only of specific fields, use the `fields` parameter.

## Method Signature

```typescript
client.indices.clearCache(this: That, params?: T.IndicesClearCacheRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesClearCacheResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesClearCacheRequest`](../types/IndicesClearCacheRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesClearCacheResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
