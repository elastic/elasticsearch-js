# Client.security.queryRole

Find roles with a query. Get roles in a paginated manner. The role management APIs are generally the preferred way to manage roles, rather than using file-based role management. The query roles API does not retrieve roles that are defined in roles files, nor built-in ones. You can optionally filter the results with a query. Also, the results can be paginated and sorted.

## Method Signature

```typescript
client.security.queryRole(this: That, params?: T.SecurityQueryRoleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityQueryRoleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityQueryRoleRequest`](../types/SecurityQueryRoleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityQueryRoleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
