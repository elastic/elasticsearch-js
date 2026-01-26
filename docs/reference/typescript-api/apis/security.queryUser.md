# Client.security.queryUser

Find users with a query. Get information for users in a paginated manner. You can optionally filter the results with a query. NOTE: As opposed to the get user API, built-in users are excluded from the result. This API is only for native users.

## Method Signature

```typescript
client.security.queryUser(this: That, params?: T.SecurityQueryUserRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityQueryUserResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityQueryUserRequest`](../types/SecurityQueryUserRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityQueryUserResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
