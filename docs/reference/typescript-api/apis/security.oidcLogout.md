# Client.security.oidcLogout

Logout of OpenID Connect. Invalidate an access token and a refresh token that were generated as a response to the `/_security/oidc/authenticate` API. If the OpenID Connect authentication realm in Elasticsearch is accordingly configured, the response to this call will contain a URI pointing to the end session endpoint of the OpenID Connect Provider in order to perform single logout. Elasticsearch exposes all the necessary OpenID Connect related functionality with the OpenID Connect APIs. These APIs are used internally by Kibana in order to provide OpenID Connect based authentication, but can also be used by other, custom web applications or other clients.

## Method Signature

```typescript
client.security.oidcLogout(this: That, params: T.SecurityOidcLogoutRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityOidcLogoutResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityOidcLogoutRequest`](../types/SecurityOidcLogoutRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityOidcLogoutResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
