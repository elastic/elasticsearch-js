# Client.security.bulkPutRole

Bulk create or update roles. The role management APIs are generally the preferred way to manage roles, rather than using file-based role management. The bulk create or update roles API cannot update roles that are defined in roles files.

## Method Signature

```typescript
client.security.bulkPutRole(this: That, params: T.SecurityBulkPutRoleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityBulkPutRoleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityBulkPutRoleRequest`](../types/SecurityBulkPutRoleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityBulkPutRoleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
