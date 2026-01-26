# Client.security.clearCachedRealms

Clear the user cache. Evict users from the user cache. You can completely clear the cache or evict specific users. User credentials are cached in memory on each node to avoid connecting to a remote authentication service or hitting the disk for every incoming request. There are realm settings that you can use to configure the user cache. For more information, refer to the documentation about controlling the user cache.

## Method Signature

```typescript
client.security.clearCachedRealms(this: That, params: T.SecurityClearCachedRealmsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityClearCachedRealmsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityClearCachedRealmsRequest`](../types/SecurityClearCachedRealmsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityClearCachedRealmsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
