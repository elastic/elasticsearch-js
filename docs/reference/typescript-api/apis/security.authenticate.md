# Client.security.authenticate

Authenticate a user. Authenticates a user and returns information about the authenticated user. Include the user information in a [basic auth header](https://en.wikipedia.org/wiki/Basic_access_authentication). A successful call returns a JSON structure that shows user information such as their username, the roles that are assigned to the user, any assigned metadata, and information about the realms that authenticated and authorized the user. If the user cannot be authenticated, this API returns a 401 status code.

## Method Signature

```typescript
client.security.authenticate(this: That, params?: T.SecurityAuthenticateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityAuthenticateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityAuthenticateRequest`](../types/SecurityAuthenticateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityAuthenticateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
