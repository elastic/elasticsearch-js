# Client.security.getToken

Get a token. Create a bearer token for access without requiring basic authentication. The tokens are created by the Elasticsearch Token Service, which is automatically enabled when you configure TLS on the HTTP interface. Alternatively, you can explicitly enable the `xpack.security.authc.token.enabled` setting. When you are running in production mode, a bootstrap check prevents you from enabling the token service unless you also enable TLS on the HTTP interface. The get token API takes the same parameters as a typical OAuth 2.0 token API except for the use of a JSON request body. A successful get token API call returns a JSON structure that contains the access token, the amount of time (seconds) that the token expires in, the type, and the scope if available. The tokens returned by the get token API have a finite period of time for which they are valid and after that time period, they can no longer be used. That time period is defined by the `xpack.security.authc.token.timeout` setting. If you want to invalidate a token immediately, you can do so by using the invalidate token API.

## Method Signature

```typescript
client.security.getToken(this: That, params?: T.SecurityGetTokenRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGetTokenResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityGetTokenRequest`](../types/SecurityGetTokenRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGetTokenResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
