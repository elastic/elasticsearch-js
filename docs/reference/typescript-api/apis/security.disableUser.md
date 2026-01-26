# Client.security.disableUser

Disable users. Disable users in the native realm. By default, when you create users, they are enabled. You can use this API to revoke a user's access to Elasticsearch.

## Method Signature

```typescript
client.security.disableUser(this: That, params: T.SecurityDisableUserRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityDisableUserResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityDisableUserRequest`](../types/SecurityDisableUserRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityDisableUserResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
