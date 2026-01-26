# Client.security.deletePrivileges

Delete application privileges. To use this API, you must have one of the following privileges: * The `manage_security` cluster privilege (or a greater privilege such as `all`). * The "Manage Application Privileges" global privilege for the application being referenced in the request.

## Method Signature

```typescript
client.security.deletePrivileges(this: That, params: T.SecurityDeletePrivilegesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityDeletePrivilegesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityDeletePrivilegesRequest`](../types/SecurityDeletePrivilegesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityDeletePrivilegesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
