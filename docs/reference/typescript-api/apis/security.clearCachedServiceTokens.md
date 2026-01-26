# Client.security.clearCachedServiceTokens

Clear service account token caches. Evict a subset of all entries from the service account token caches. Two separate caches exist for service account tokens: one cache for tokens backed by the `service_tokens` file, and another for tokens backed by the `.security` index. This API clears matching entries from both caches. The cache for service account tokens backed by the `.security` index is cleared automatically on state changes of the security index. The cache for tokens backed by the `service_tokens` file is cleared automatically on file changes.

## Method Signature

```typescript
client.security.clearCachedServiceTokens(this: That, params: T.SecurityClearCachedServiceTokensRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityClearCachedServiceTokensResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityClearCachedServiceTokensRequest`](../types/SecurityClearCachedServiceTokensRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityClearCachedServiceTokensResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
