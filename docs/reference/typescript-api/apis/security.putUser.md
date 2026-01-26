# Client.security.putUser

Create or update users. Add and update users in the native realm. A password is required for adding a new user but is optional when updating an existing user. To change a user's password without updating any other fields, use the change password API.

## Method Signature

```typescript
client.security.putUser(this: That, params: T.SecurityPutUserRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityPutUserResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityPutUserRequest`](../types/SecurityPutUserRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityPutUserResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
