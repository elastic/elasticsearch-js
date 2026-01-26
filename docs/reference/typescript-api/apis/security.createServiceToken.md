# Client.security.createServiceToken

Create a service account token. Create a service accounts token for access without requiring basic authentication. NOTE: Service account tokens never expire. You must actively delete them if they are no longer needed.

## Method Signature

```typescript
client.security.createServiceToken(this: That, params: T.SecurityCreateServiceTokenRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityCreateServiceTokenResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityCreateServiceTokenRequest`](../types/SecurityCreateServiceTokenRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityCreateServiceTokenResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
