# Client.security.deleteRole

Delete roles. Delete roles in the native realm. The role management APIs are generally the preferred way to manage roles, rather than using file-based role management. The delete roles API cannot remove roles that are defined in roles files.

## Method Signature

```typescript
client.security.deleteRole(this: That, params: T.SecurityDeleteRoleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityDeleteRoleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityDeleteRoleRequest`](../types/SecurityDeleteRoleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityDeleteRoleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
