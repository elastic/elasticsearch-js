# Client.security.oidcAuthenticate

Authenticate OpenID Connect. Exchange an OpenID Connect authentication response message for an Elasticsearch internal access token and refresh token that can be subsequently used for authentication. Elasticsearch exposes all the necessary OpenID Connect related functionality with the OpenID Connect APIs. These APIs are used internally by Kibana in order to provide OpenID Connect based authentication, but can also be used by other, custom web applications or other clients.

## Method Signature

```typescript
client.security.oidcAuthenticate(this: That, params: T.SecurityOidcAuthenticateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityOidcAuthenticateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityOidcAuthenticateRequest`](../types/SecurityOidcAuthenticateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityOidcAuthenticateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
