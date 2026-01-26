# Client.security.getRole

Get roles. Get roles in the native realm. The role management APIs are generally the preferred way to manage roles, rather than using file-based role management. The get roles API cannot retrieve roles that are defined in roles files.

## Method Signature

```typescript
client.security.getRole(this: That, params?: T.SecurityGetRoleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGetRoleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityGetRoleRequest`](../types/SecurityGetRoleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGetRoleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
