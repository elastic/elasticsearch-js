# Client.security.oidcPrepareAuthentication

Prepare OpenID connect authentication. Create an oAuth 2.0 authentication request as a URL string based on the configuration of the OpenID Connect authentication realm in Elasticsearch. The response of this API is a URL pointing to the Authorization Endpoint of the configured OpenID Connect Provider, which can be used to redirect the browser of the user in order to continue the authentication process. Elasticsearch exposes all the necessary OpenID Connect related functionality with the OpenID Connect APIs. These APIs are used internally by Kibana in order to provide OpenID Connect based authentication, but can also be used by other, custom web applications or other clients.

## Method Signature

```typescript
client.security.oidcPrepareAuthentication(this: That, params?: T.SecurityOidcPrepareAuthenticationRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityOidcPrepareAuthenticationResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityOidcPrepareAuthenticationRequest`](../types/SecurityOidcPrepareAuthenticationRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityOidcPrepareAuthenticationResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
