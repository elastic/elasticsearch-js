# Client.security.putRole

Create or update roles. The role management APIs are generally the preferred way to manage roles in the native realm, rather than using file-based role management. The create or update roles API cannot update roles that are defined in roles files. File-based role management is not available in Elastic Serverless.

## Method Signature

```typescript
client.security.putRole(this: That, params: T.SecurityPutRoleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityPutRoleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityPutRoleRequest`](../types/SecurityPutRoleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityPutRoleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
