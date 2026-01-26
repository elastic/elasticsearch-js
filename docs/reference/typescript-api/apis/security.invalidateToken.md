# Client.security.invalidateToken

Invalidate a token. The access tokens returned by the get token API have a finite period of time for which they are valid. After that time period, they can no longer be used. The time period is defined by the `xpack.security.authc.token.timeout` setting. The refresh tokens returned by the get token API are only valid for 24 hours. They can also be used exactly once. If you want to invalidate one or more access or refresh tokens immediately, use this invalidate token API. NOTE: While all parameters are optional, at least one of them is required. More specifically, either one of `token` or `refresh_token` parameters is required. If none of these two are specified, then `realm_name` and/or `username` need to be specified.

## Method Signature

```typescript
client.security.invalidateToken(this: That, params?: T.SecurityInvalidateTokenRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityInvalidateTokenResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityInvalidateTokenRequest`](../types/SecurityInvalidateTokenRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityInvalidateTokenResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
