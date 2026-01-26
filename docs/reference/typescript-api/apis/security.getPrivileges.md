# Client.security.getPrivileges

Get application privileges. To use this API, you must have one of the following privileges: * The `read_security` cluster privilege (or a greater privilege such as `manage_security` or `all`). * The "Manage Application Privileges" global privilege for the application being referenced in the request.

## Method Signature

```typescript
client.security.getPrivileges(this: That, params?: T.SecurityGetPrivilegesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGetPrivilegesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityGetPrivilegesRequest`](../types/SecurityGetPrivilegesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGetPrivilegesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
