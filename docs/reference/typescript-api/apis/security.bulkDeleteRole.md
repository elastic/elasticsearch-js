# Client.security.bulkDeleteRole

Bulk delete roles. The role management APIs are generally the preferred way to manage roles, rather than using file-based role management. The bulk delete roles API cannot delete roles that are defined in roles files.

## Method Signature

```typescript
client.security.bulkDeleteRole(this: That, params: T.SecurityBulkDeleteRoleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityBulkDeleteRoleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityBulkDeleteRoleRequest`](../types/SecurityBulkDeleteRoleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityBulkDeleteRoleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
