# Client.security.clearApiKeyCache

Clear the API key cache. Evict a subset of all entries from the API key cache. The cache is also automatically cleared on state changes of the security index.

## Method Signature

```typescript
client.security.clearApiKeyCache(this: That, params: T.SecurityClearApiKeyCacheRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityClearApiKeyCacheResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityClearApiKeyCacheRequest`](../types/SecurityClearApiKeyCacheRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityClearApiKeyCacheResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
